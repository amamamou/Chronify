import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-admin-schedule',
  templateUrl: './admin-schedule.component.html',
  styleUrls: ['./admin-schedule.component.css']
})
export class AdminScheduleComponent {
schedules: any[] = [];
  selectedDay: string = '';
  selectedTeacher: string = '';
  selectedClass: string = '';
  searchQuery: string = '';
  currentDate = new Date();
  isPrinting: boolean = false;

  constructor(private scheduleService: ScheduleService, private router: Router) {}

   // Function to handle the print logic
   printSchedule(): void {
    this.isPrinting = true;
    window.print();
    // After printing, reset isPrinting to false
    window.onafterprint = () => {
      this.isPrinting = false;
    };
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
    }else if (query.includes('home') || query.includes('admin')){
      this.router.navigate(['/admin/home']);
    }
  }

  ngOnInit(): void {
    this.fetchSchedules();
  }

  fetchSchedules(): void {
    this.scheduleService.getSchedules().subscribe(
      (data) => {
        this.schedules = data;
      },
      (error) => {
        console.error('Error fetching schedules:', error);
      }
    );
  }

  // Getter method to filter schedules
  get filteredSchedules() {
    return this.schedules.filter(schedule => {
      return (
        (this.selectedDay ? schedule.day === this.selectedDay : true) &&
        (this.selectedTeacher ? schedule.teacher?.name.toLowerCase().includes(this.selectedTeacher.toLowerCase()) : true) &&
        (this.selectedClass ? schedule.class?.name.toLowerCase().includes(this.selectedClass.toLowerCase()) : true)
      );
    });
  }

}
