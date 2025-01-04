import { Component, OnInit } from '@angular/core'; 
import { ClassService } from 'src/app/services/class.service'; 
import { StudentService } from 'src/app/services/student.service'; 

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.css']
})
export class AdminStudentsComponent implements OnInit {
  students: any[] = [];
  classes: any[] = [];
  studentName: string = '';
  selectedClassId: number | null = null;

  constructor(private classService: ClassService, private studentService: StudentService) {}

  ngOnInit(): void {
    this.getClasses();
    this.getStudents();
  }

  getClasses(): void {
    this.classService.getClasses().subscribe((data: any[]) => {
      this.classes = data;
      console.log('Classes:', this.classes);
    });
  }

  getStudents(): void {
    this.studentService.getAllStudents().subscribe((data: any[]) => {
      this.students = data;
      console.log('Students:', this.students);
    });
  }

  addStudent(): void {
    // Check if all fields are filled
    if (!this.studentName || !this.selectedClassId) {
      alert('Please fill in all fields before adding a student.');
      return;
    }

    const newStudent = { name: this.studentName, classId: this.selectedClassId };
    this.studentService.addStudent(newStudent).subscribe(() => {
      this.getStudents(); // Refresh the student list after adding a new student
      this.studentName = ''; // Clear the input fields after adding
      this.selectedClassId = null; // Clear the selected class
    });
  }

  deleteStudent(studentId: number): void {
    // Confirmation prompt before deleting
    const confirmDelete = confirm('Are you sure you want to delete this student?');
    if (confirmDelete) {
      this.studentService.deleteStudent(studentId).subscribe(() => {
        this.getStudents(); // Refresh the student list after deleting
      });
    }
  }
}
