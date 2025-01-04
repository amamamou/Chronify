import { Component } from '@angular/core';
import { ClassroomService } from 'src/app/services/classroom.service';

@Component({
  selector: 'app-admin-classrooms',
  templateUrl: './admin-classrooms.component.html',
  styleUrls: ['./admin-classrooms.component.css']
})
export class AdminClassroomsComponent {
  classrooms: any[] = [];  // Array to hold classrooms
  newClassroom: any = { name: '' };  // Model for creating a new classroom
  isEditing: boolean = false;  // Flag to track if we're editing a classroom
  editingClassroom: any = {};  // Holds the classroom being edited

  constructor(private classroomService: ClassroomService) {}

  ngOnInit(): void {
    this.fetchClassrooms();  // Fetch classrooms on initialization
  }

  // Fetch classrooms from the backend
  fetchClassrooms(): void {
    console.log('Fetching classrooms...');
    this.classroomService.getClassrooms().subscribe(
      (data) => {
        console.log('Classrooms fetched:', data);
        this.classrooms = data;
      },
      (error) => {
        console.error('Error fetching classrooms:', error);
      }
    );
  }

  // Create a new classroom
  createClassroom(): void {
    if (this.newClassroom.name) {
      console.log('Creating classroom:', this.newClassroom);
      this.classroomService.createClassroom(this.newClassroom).subscribe(
        (data) => {
          console.log('Classroom created:', data);
          this.fetchClassrooms();  // Re-fetch classrooms after creation
          this.newClassroom = { name: ''};  // Reset form
        },
        (error) => {
          console.error('Error creating classroom:', error);
        }
      );
    } else {
      console.error('Form data is invalid');
    }
  }

  // Edit a classroom
  editClassroom(classroom: any): void {
    this.isEditing = true;
    this.editingClassroom = { ...classroom };  // Copy the classroom data for editing
    console.log('Editing classroom:', this.editingClassroom);
  }

  updateClassroom(): void {
    if (this.editingClassroom.name) {
      console.log('Updating classroom:', this.editingClassroom);
      this.classroomService.updateClassroom(this.editingClassroom.id, this.editingClassroom).subscribe(
        (data) => {
          console.log('Classroom updated:', data);
          this.fetchClassrooms();  // Re-fetch classrooms after update
          this.isEditing = false;
          this.editingClassroom = {};  // Reset the editing form
        },
        (error) => {
          console.error('Error updating classroom:', error);
        }
      );
    } else {
      console.error('Form data is invalid');
    }
  }
  

  // Delete a classroom
  deleteClassroom(id: number): void {
    if (confirm('Are you sure you want to delete this classroom?')) {
      console.log('Deleting classroom with id:', id);
      this.classroomService.deleteClassroom(id).subscribe(
        () => {
          console.log('Classroom deleted');
          this.fetchClassrooms();  // Re-fetch classrooms after deletion
        },
        (error) => {
          console.error('Error deleting classroom:', error);
        }
      );
    }
  }
}
