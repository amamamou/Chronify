import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  totalTeachers: number = 0;
  totalStudents: number = 0;
  todayDate: string = '';

  constructor(
    private teacherService: TeacherService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.getTeachersCount();
    this.getStudentsCount();
    this.formatTodayDate();
  }

  // Fetch total teachers count
  getTeachersCount(): void {
    this.teacherService.getTeachers().subscribe(teachers => {
      this.totalTeachers = teachers.length;  // Assuming the response is an array
    });
  }

  // Fetch total students count
  getStudentsCount(): void {
    this.studentService.getAllStudents().subscribe(students => {
      this.totalStudents = students.length;  // Assuming the response is an array
    });
  }

  // Format today's date as "January 4, 2025"
  formatTodayDate(): void {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    this.todayDate = new Date().toLocaleDateString('en-US', options);
  }
}
