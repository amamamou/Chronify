import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleService } from 'src/app/services/schedule.service';
import { Observable } from 'rxjs';
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
  selector: 'app-admin-schedule',
  templateUrl: './admin-schedule.component.html',
  styleUrls: ['./admin-schedule.component.css'],
})
export class AdminScheduleComponent {
  schedules: any[] = [];
  selectedDay: string = '';
  selectedTeacher: string = '';
  selectedClass: string = '';
  searchQuery: string = '';
  currentDate = new Date();
  isPrinting: boolean = false;

  // New schedule model
  newSchedule: any = {
    teacherName: '',
    subjectName: '',
    className: '',
    duration: '',
  };

  constructor(private scheduleService: ScheduleService, private router: Router,private authService: AuthService) {}

// Function to handle the print logic
printSchedule(): void {
  // Set the flag to hide the sidebar
  window.print();
}

  userDetails: UserDetails = { username: '', email: '', cin: '', id: '', role: '', classId: '' };  // Include classId in userDetails


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
  logout() {
    this.authService.logout(); // Call the logout method from AuthService
  }

  ngOnInit(): void {
     const fetchedDetails = this.authService.getUserDetails();
    if (fetchedDetails) {
      this.userDetails = fetchedDetails;
      console.log('Logged in user details:', this.userDetails);
      
   
    this.fetchSchedules();
  }
  }
  fetchSchedules(): void {
    this.scheduleService.getSchedules().subscribe(
      (data: any[]) => {
        this.schedules = data;
      },
      (error: any) => {
        console.error('Error fetching schedules:', error);
      }
    );
  }

  // Function to add a new schedule
  addSchedule(newSchedule: any): void {
    this.scheduleService.addSchedule(newSchedule).subscribe(
      (data: any) => {
        // Handle the response after adding the schedule
        console.log('Schedule added successfully', data);
        this.fetchSchedules(); // Refresh the schedule list
      },
      (error: any) => {
        console.error('Error adding schedule:', error);
      }
    );
  }
  generateSchedule(): void {
    if (this.newSchedule.teacherName && this.newSchedule.subjectName && this.newSchedule.className && this.newSchedule.duration) {
      this.addSchedule(this.newSchedule);
      this.newSchedule = { teacherName: '', subjectName: '', className: '', duration: '' }; // Reset after submission
    } else {
      alert('Please fill in all the fields');
    }
  }
  
  // Getter method to filter schedules
  get filteredSchedules() {
    return this.schedules.filter((schedule) => {
      return (
        (this.selectedDay ? schedule.day === this.selectedDay : true) &&
        (this.selectedTeacher
          ? schedule.teacher?.name.toLowerCase().includes(this.selectedTeacher.toLowerCase())
          : true) &&
        (this.selectedClass
          ? schedule.class?.name.toLowerCase().includes(this.selectedClass.toLowerCase())
          : true)
      );
    });
  }
}
