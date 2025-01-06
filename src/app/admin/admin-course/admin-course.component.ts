import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectService } from 'src/app/services/subject.services';

@Component({
  selector: 'app-admin-course',
  templateUrl: './admin-course.component.html',
  styleUrls: ['./admin-course.component.css']
})
export class AdminCourseComponent {
  courses: any[] = [];
  courseName: string = '';
  searchQuery: string = '';
  courseToUpdate: any = null; // Add this line to define the courseToUpdate property

  constructor(private courseService: SubjectService, private router: Router) {}

  // Search functionality to navigate based on query
  onSearch() {
    const query = this.searchQuery.toLowerCase().trim();

    if (query.includes('schedule') || query.includes('emploi')) {
      this.router.navigate(['/admin/schedule']);
    } else if (query.includes('student') || query.includes('students')) {
      this.router.navigate(['/admin/student']);
    } else if (query.includes('teacher') || query.includes('teachers')) {
      this.router.navigate(['/admin/teachers']);
    } else if (query.includes('emploi') || query.includes('classes')) {
      this.router.navigate(['/admin/classes']);
    } else if (query.includes('subject') || query.includes('courses')) {
      this.router.navigate(['/admin/courses']);
    } else if (query.includes('classrooms') || query.includes('salle') || query.includes('salles')) {
      this.router.navigate(['/admin/classrooms']);
    } else if (query.includes('home') || query.includes('admin')) {
      this.router.navigate(['/admin/home']);
    }
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  // Load all courses from the service
  loadCourses(): void {
    this.courseService.getAllSubjects().subscribe((data) => {
      this.courses = data;
    });
  }

  // Add a new course
  addCourse(): void {
    if (!this.courseName.trim()) {
      alert('Course name is required!');
      return;
    }

    const newCourse = {
      name: this.courseName
    };

    this.courseService.createSubject(newCourse).subscribe(() => {
      this.loadCourses();
      this.courseName = ''; // Clear input field after adding course
    });
  }

  // Delete a course with confirmation prompt
  deleteCourse(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this course?');
    if (confirmDelete) {
      this.courseService.deleteSubject(id).subscribe(() => {
        this.loadCourses(); // Refresh course list after deleting
      });
    }
  }

  // Method to open the update form with the selected course data
  openUpdateForm(course: any) {
    this.courseToUpdate = { ...course };  // Copy the course data to courseToUpdate
    this.courseName = course.name;  // Set the course name in the input field
  }

  // Method to update the course
  updateCourse(): void {
    if (!this.courseName.trim()) {
      alert('Course name is required!');
      return;
    }

    const courseData = {
      name: this.courseName
    };

    this.courseService.updateSubject(this.courseToUpdate.id, courseData).subscribe(() => {
      this.loadCourses();
      this.courseName = ''; // Clear input field after updating
      this.courseToUpdate = null; // Reset the courseToUpdate after updating
    });
  }
}
