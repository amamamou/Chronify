import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstructorService } from 'src/app/services/instructor.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SubjectService } from 'src/app/services/subject.services';
import { AuthService } from 'src/app/services/auth.service';
interface UserDetails {
  username: string;
  email: string;
  cin: string;
  id: string;
  role: string;
  classId: string; // Assuming classId is part of user details

}
@Component({
  selector: 'app-admin-teachers',
  templateUrl: './admin-teachers.component.html',
  styleUrls: ['./admin-teachers.component.css']
})
export class AdminTeachersComponent implements OnInit {
  teachers: any[] = [];
  teacherName: string = '';
  teacherSubjects: string[] = [];
  searchQuery: string = '';
  subjects: any[] = [];
  newSubject: string = '';
  isEditing: boolean = false;
  currentTeacherId: number | null = null;
  teacherCIN: string = ''; // For CIN input
  selectedTeacher: any = null; // To hold the fetched teacher details
  userDetails: UserDetails = { username: '', email: '', cin: '', id: '', role: '', classId: '' };  // Include classId in userDetails

  // Manually assign starting ID
  private nextId: number = 9;

  constructor(
    private instructorService: InstructorService,
    private subjectService: SubjectService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const fetchedDetails = this.authService.getUserDetails();
    if (fetchedDetails) {
      this.userDetails = fetchedDetails;
      console.log('Logged in user details:', this.userDetails);
      
   
    this.fetchTeachers();
    this.fetchSubjects();
  }}

  fetchTeachers(): void {
    this.instructorService.getAllTeachers().subscribe(
      (teachers) => {
        console.log('Fetched teachers:', teachers);  // Log the response to verify the structure
        this.teachers = teachers;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching teachers:', error);
      }
    );
  }
  
  // Fetch all subjects
  fetchSubjects(): void {
    this.subjectService.getAllSubjects().subscribe(
      (subjects) => {
        this.subjects = subjects;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching subjects:', error);
      }
    );
  }

  // Fetch teacher by CIN
  fetchTeacherByCIN(): void {
    if (!this.teacherCIN.trim()) {
      alert('Please enter a CIN.');
      return;
    }

    this.instructorService.getTeacherByCIN(this.teacherCIN).subscribe(
      (teacher: any) => {
        this.selectedTeacher = teacher;
        console.log('Fetched teacher by CIN:', teacher);
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching teacher by CIN:', error);
        alert('Teacher not found.');
      }
    );
  }

  // AdminTeachersComponent
  saveTeacher(): void {
    console.log('CIN:', this.teacherCIN); // Debugging CIN value
    const teacherData = {
      id: this.nextId, // Use the manually assigned ID
      name: this.teacherName,
      cin: this.teacherCIN, // Ensure CIN is included
      subjects: this.teacherSubjects.length > 0 ? this.teacherSubjects : [this.newSubject],
    };

    if (this.isEditing && this.currentTeacherId !== null) {
      // Update teacher with CIN and ID
      this.instructorService.updateTeacher(
        this.currentTeacherId,
        teacherData.name,
        teacherData.cin,  // Pass CIN here as well
        teacherData.subjects
      ).subscribe(
        () => {
          this.fetchTeachers();
          this.cancelEdit();
        },
        (error: HttpErrorResponse) => {
          console.error('Error updating teacher:', error);
        }
      );
    } else if (!this.isEditing) {
      // Create teacher with CIN and manually assigned ID
      this.instructorService.createTeacher(
        teacherData.name,
        teacherData.cin,  // Pass CIN here as well
        teacherData.subjects
      ).subscribe(
        (newTeacher: any) => {
          // After creating the teacher, increment the ID for the next teacher
          this.nextId++; // Increment the ID for the next teacher
          // Redirect to the edit page with the newly created teacher's ID
        },
        (error: HttpErrorResponse) => {
          console.error('Error adding teacher:', error);
        }
      );
    }
  }

  editTeacher(teacher: any): void {
    console.log('Editing teacher with ID:', teacher.id); // Debugging line
    this.isEditing = true;
    this.currentTeacherId = teacher.id;
    this.teacherName = teacher.name;
    this.teacherCIN = teacher.cin;
    this.teacherSubjects = teacher.subjects || [];
  }

  // Delete teacher
  deleteTeacher(teacherId: number): void {
    if (confirm('Are you sure you want to delete this teacher?')) {
      this.instructorService.deleteTeacher(teacherId).subscribe(
        () => {
          this.fetchTeachers();
        },
        (error: HttpErrorResponse) => {
          console.error('Error deleting teacher:', error);
        }
      );
    }
  }

  // Cancel edit mode and reset form
  cancelEdit(): void {
    this.isEditing = false;
    this.currentTeacherId = null;
    this.resetForm();
  }

  // Reset form fields
  resetForm(): void {
    this.teacherName = '';
    this.teacherCIN = '';
    this.teacherSubjects = [];
    this.newSubject = '';
  }
  
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

}}
