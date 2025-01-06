import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-reclamation',
  templateUrl: './admin-reclamation.component.html',
  styleUrls: ['./admin-reclamation.component.css']
})
export class AdminReclamationComponent {

  searchQuery: string = '';
  complaints = [
    {
      id: 1,
      userName: 'John Doe',
      email: 'johndoe@example.com',
      description: 'Issue with login functionality.',
      status: 'Pending',
    },
    {
      id: 2,
      userName: 'Jane Smith',
      email: 'janesmith@example.com',
      description: 'Error in payment process.',
      status: 'Resolved',
    },
    {
      id: 3,
      userName: 'Michael Brown',
      email: 'michaelbrown@example.com',
      description: 'Complaint about service quality.',
      status: 'In Progress',
    },
  ];

  constructor(private router: Router) {}
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
}

