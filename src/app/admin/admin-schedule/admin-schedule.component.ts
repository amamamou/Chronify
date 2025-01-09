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
  classId: string; 

}
@Component({
  selector: 'app-admin-schedule',
  templateUrl: './admin-schedule.component.html',
  styleUrls: ['./admin-schedule.component.css'],
})
export class AdminScheduleComponent {
  schedules: any[] = [];
  timeSlots: any[] = [
    { time: '08:00 - 09:00' },
    { time: '09:00 - 10:00' },
    { time: '10:00 - 11:00' },
    { time: '11:00 - 12:00' },
    { time: '12:00 - 13:00' },
    { time: '13:00 - 14:00' },
    { time: '14:00 - 15:00' },
    { time: '15:00 - 16:00' },
  ]; 

  days: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  
  selectedDay: string = '';
  selectedTeacher: string = '';
  selectedClass: string = '';
  searchQuery: string = '';
  currentDate = new Date();
  isPrinting: boolean = false;

  newSchedule: any = {
    teacherName: '',
    subjectName: '',
    className: '',
    duration: ''
  };


  userDetails: UserDetails = { username: '', email: '', cin: '', id: '', role: '', classId: '' };

  constructor(private scheduleService: ScheduleService, private router: Router, private authService: AuthService) {}

 
  printSchedule(): void {
    window.print();
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
  }

  logout() {
    this.authService.logout();
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

  generateSchedule() {
    console.log('Generate Schedule button clicked');
    if (
      this.newSchedule.teacherName &&
      this.newSchedule.subjectName &&
      this.newSchedule.className &&
      this.newSchedule.duration
    ) {
      console.log('New schedule:', this.newSchedule);
  
      // Prepare the data as an array
      const scheduleArray = [{ ...this.newSchedule }];
  
      // Send the schedule to the backend
      this.scheduleService.addSchedule(scheduleArray).subscribe(
        (response) => {
          console.log('Response from backend:', response);
          this.fetchSchedules(); // Optionally refresh schedules
        },
        (error) => {
          console.error('Error sending schedule to backend:', error);
        }
      );
  
      // Reset the input fields for new entry
      this.newSchedule = {
        teacherName: '',
        subjectName: '',
        className: '',
        duration: ''
      };
    } else {
      alert('Please fill in all fields before generating the schedule.');
    }
  }
  
  

  getCoursesForSlotAndDay(slot: any, day: string): any[] {
    return this.filteredSchedules.filter((schedule) => {
      const startTime = schedule.startTime;
      const endTime = schedule.endTime;

      const slotStart = slot.time.split(' - ')[0];
      const slotEnd = slot.time.split(' - ')[1];

      return startTime === slotStart && endTime === slotEnd && schedule.day === day;
    });
  }

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