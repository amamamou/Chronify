import { Component } from '@angular/core';
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

  constructor(private scheduleService: ScheduleService) {}

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
  printSchedule() {
    window.print(); // Trigger the browser's print dialog
  }
}
