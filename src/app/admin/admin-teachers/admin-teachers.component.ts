import { Component } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-admin-teachers',
  templateUrl: './admin-teachers.component.html',
  styleUrls: ['./admin-teachers.component.css']
})
export class AdminTeachersComponent {

  teachers: any[] = [];
  newTeacherName: string = '';

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  // Load teachers from the backend
  loadTeachers(): void {
    this.teacherService.getTeachers().subscribe((data) => {
      this.teachers = data;
    });
  }

  // Add a new teacher
  addTeacher(): void {
    // Check if the teacher name is empty
    if (!this.newTeacherName.trim()) {
      alert('Please enter a teacher name.');
      return;
    }

    this.teacherService.addTeacher(this.newTeacherName).subscribe(() => {
      this.loadTeachers();  // Reload teachers after adding
      this.newTeacherName = '';  // Clear input field
    });
  }

  // Delete a teacher
  deleteTeacher(id: number): void {
    // Confirmation prompt before deleting
    const confirmDelete = confirm('Are you sure you want to delete this teacher?');
    if (confirmDelete) {
      this.teacherService.deleteTeacher(id).subscribe(() => {
        this.loadTeachers();  // Reload teachers after deletion
      });
    }
  }
}
