import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-admin-teachers',
  templateUrl: './admin-teachers.component.html',
  styleUrls: ['./admin-teachers.component.css']
})
export class AdminTeachersComponent implements OnInit {
  teachers: any[] = [];
  teacherName: string = '';
  searchQuery: string = '';

  constructor(private teacherService: TeacherService, private router: Router) {}

  onSearch() {
    const query = this.searchQuery.toLowerCase().trim();

    if (query.includes('schedule') || query.includes('emploi')) {
      this.router.navigate(['/admin/schedule']);
    } else if (query.includes('student') || query.includes('students')) {
      this.router.navigate(['/admin/student']);
    } else if (query.includes('teacher') || query.includes('teachers')) {
      this.router.navigate(['/admin/teachers']);
    } else if (query.includes('classes')) {
      this.router.navigate(['/admin/classes']);
    } else if (query.includes('subject') || query.includes('courses')) {
      this.router.navigate(['/admin/courses']);
    } else if (query.includes('classrooms') || query.includes('salle')) {
      this.router.navigate(['/admin/classrooms']);
    } else if (query.includes('home') || query.includes('admin')) {
      this.router.navigate(['/admin/home']);
    }
  }

  ngOnInit(): void {
    this.getTeachers();
  }

  getTeachers(): void {
    this.teacherService.getAllTeachers().subscribe((data: any[]) => {
      this.teachers = data;
      console.log('Teachers:', this.teachers);
    });
  }

  addTeacher(): void {
    const newTeacher = { name: this.teacherName };
    this.teacherService.addTeacher(newTeacher).subscribe(() => {
      this.getTeachers(); // Refresh the teacher list after adding
      this.teacherName = ''; // Clear the input field
    });
  }

  deleteTeacher(teacherId: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this teacher?');
    if (confirmDelete) {
      this.teacherService.deleteTeacher(teacherId).subscribe(() => {
        this.getTeachers(); // Refresh the teacher list after deleting
      });
    }
  }
}
