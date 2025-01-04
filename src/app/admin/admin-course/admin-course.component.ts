import { Component } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.services';

@Component({
  selector: 'app-admin-course',
  templateUrl: './admin-course.component.html',
  styleUrls: ['./admin-course.component.css']
})
export class AdminCourseComponent {
  courses: any[] = [];
  courseName: string = '';

  constructor(private courseService: SubjectService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe((data) => {
      this.courses = data;
    });
  }

  addCourse(): void {
    if (!this.courseName.trim()) {
      alert('Course name is required!');
      return;
    }

    const newCourse = {
      name: this.courseName
    };

    this.courseService.createCourse(newCourse).subscribe(() => {
      this.loadCourses();
      this.courseName = ''; // Clear input field after adding course
    });
  }

  // Delete a course with confirmation prompt
  deleteCourse(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this course?');
    if (confirmDelete) {
      this.courseService.deleteCourse(id).subscribe(() => {
        this.loadCourses(); // Refresh course list after deleting
      });
    }
  }
}
