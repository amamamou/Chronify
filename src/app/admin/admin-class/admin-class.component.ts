import { Component } from '@angular/core';
import { ClassService } from 'src/app/services/class.service';
import { StudentService } from 'src/app/services/student.service';

interface Student {
  id: number;
  name: string;
}

interface Class {
  id: number;
  name: string;
  level: string;
  students: Student[];
}

@Component({
  selector: 'app-admin-class',
  templateUrl: './admin-class.component.html',
  styleUrls: ['./admin-class.component.css']
})
export class AdminClassComponent {
  classes: Class[] = [];
  students: Student[] = [];
  newClass = { name: '', level: '', students: [] as Student[] };

  constructor(private classService: ClassService, private studentService: StudentService) {}

  ngOnInit(): void {
    this.getClasses();
    this.getStudents(); // Fetch all students when the component initializes
  }

  getClasses(): void {
    this.classService.getClasses().subscribe((data: Class[]) => {
      this.classes = data;
      console.log('Classes:', this.classes); // Check if classes have students

      // Fetch students for each class
      this.classes.forEach(classItem => {
        this.getStudentsByClass(classItem.id); // Call to fetch students for each class
      });
    });
  }

  getStudents(): void {
    this.studentService.getAllStudents().subscribe((data: Student[]) => {
      this.students = data; // Store all students in the students array
    });
  }

  getStudentsByClass(classId: number): void {
    this.classService.getStudentsByClass(classId).subscribe((data: Student[]) => {
      console.log('Fetched students for class:', data);
      const classToUpdate = this.classes.find(c => c.id === classId);
      if (classToUpdate) {
        classToUpdate.students = data; // Update the students of the class
        console.log('Updated class with students:', classToUpdate); // Log the updated class
      }
    });
  }

  addClass(): void {
    // Check if the class name is empty
    if (!this.newClass.name.trim()) {
      alert('Please enter a class name.');
      return;
    }

    // Check if any selected students are already assigned to another class
    const selectedStudents = this.newClass.students;
    for (let student of selectedStudents) {
      for (let classItem of this.classes) {
        if (classItem.students.some((s: Student) => s.id === student.id)) {
          alert(`Student with the id ${student} is already assigned to another class.`);
          return;
        }
      }
    }

    this.classService.addClass(this.newClass).subscribe(() => {
      this.getClasses(); // Refresh class list after adding a new class
      this.newClass = { name: '', level: '', students: [] }; // Reset the newClass object
    });
  }

  deleteClass(classId: number): void {
    this.classService.deleteClass(classId).subscribe(() => {
      this.getClasses(); // Refresh class list after deleting
    });
  }
}
