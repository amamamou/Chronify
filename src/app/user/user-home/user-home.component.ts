import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { ScheduleService } from 'src/app/services/schedule.service';

interface Message {
  sender: string;
  subject: string;
  content: string;
}

// Define an interface for user details
interface UserDetails {
  username: string;
  email: string;
  cin: string;
  id: string;
  role: string;
  classId: string;
}

export interface StudentProfile {
  id: number;
  name: string;
  institution: string;
  grade: string;
  classes: string[];
  email: string;
  phone?: string;
  photoUrl?: string;
}

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {
  selectedMessage: Message | null = null;
  reclamationData = {
    name: '',
    email: '',
    message: '',
  };

  events = Array.from({ length: 10 }, (_, i) => ({ image: `assets/events/${i + 1}.jpg` }));
  courses = Array.from({ length: 10 }, (_, i) => ({ image: `assets/courses/${i + 1}.jpg`, title: `Course ${i + 1}` }));

  dashboardItems = [
    { title: 'Profile Details', description: 'Access your account information and personal details.', icon: 'assets/user/1.png' },
    { title: 'My Schedule', description: 'Access your timetable, upcoming events, and deadlines.', icon: 'assets/user/2.png' },
    { title: 'Manage Profile', description: 'Update personal information, change your password, or upload a profile picture.', icon: 'assets/user/3.png' },
    { title: 'Notifications', description: 'View your latest updates, reminders, or alerts.', icon: 'assets/user/4.png' },
    { title: 'Messages', description: 'Communicate with your instructors, peers, or support team.', icon: 'assets/user/5.png' },
    { title: 'Support Center', description: 'Get help with common issues or contact support for assistance.', icon: 'assets/user/6.png' },
    { title: 'My Achievements', description: 'Track your progress, certifications, and milestones.', icon: 'assets/user/7.png' },
    { title: 'Learning Resources', description: 'Access study materials, guides, and helpful tools.', icon: 'assets/user/8.png' },
  ];

  studentProfile: StudentProfile = {
    id: 1,
    name: 'Jane Smith',
    institution: 'Elite International Academy',
    grade: 'Grade 10',
    classes: ['Mathematics', 'English Literature', 'Biology'],
    email: 'janesmith@student.eliteacademy.com',
    phone: '+1 987 654 321',
    photoUrl: 'assets/student1.png',
  };

  messages: Message[] = [
    { sender: 'John Doe', subject: 'Meeting Reminder', content: 'Don\'t forget about the meeting tomorrow at 10 AM.' },
    { sender: 'Jane Smith', subject: 'Course Update', content: 'Your course material has been updated, please check.' },
    { sender: 'HR Team', subject: 'Internship Opportunity', content: 'We have an exciting internship opportunity for you.' },
    { sender: 'Support', subject: 'Password Reset', content: 'You requested a password reset. Click the link below.' },
  ];

  notifications = [
    { title: 'New Assignment', description: 'You have a new assignment due in 3 days.' },
    { title: 'System Update', description: 'A system update is scheduled for tomorrow.' },
    { title: 'Event Reminder', description: 'Your upcoming event is starting soon.' },
  ];

  userDetails: UserDetails = { username: '', email: '', cin: '', id: '', role: '', classId: '' };
  schedule: any[] = [];

  dots = [0, 1, 2];
  activeEventIndex = 0;
  activeCourseIndex = 0;
 // Visibility flags for overlays
 isProfileVisible = false;
 isProfileFormVisible = false;
 isScheduleVisible = false;
 isMessagesVisible = false;
 isSupportVisible = false;

 selectedDay: string = '';
 selectedTeacher: string = '';
 selectedClass: string = '';
 activeIndex1: number = 0; // Example property
  activeIndex2: number = 0;

  constructor(
    private authService: AuthService,
    private reclamationService: ReclamationService,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit(): void { 
    // Fetch user details from AuthService
    const fetchedDetails = this.authService.getUserDetails();
    if (fetchedDetails) {
      this.userDetails = fetchedDetails;
      console.log('Logged in user details:', this.userDetails);
  
      // Fetch schedule based on the user's class ID
      if (this.userDetails.classId) {
        this.getScheduleByClassId(this.userDetails.classId);
      } else {
        console.warn('Class ID not found in fetched details.');
      }
  
      // Set the email field in reclamationData
      if (this.userDetails.email) {
        this.reclamationData.email = this.userDetails.email;
      } else {
        console.warn('User email not found in fetched details.');
      }
    } else {
      console.error('No user details found. Please log in.');
    }
  }
  
  getScheduleByClassId(classId: string): void {
    this.scheduleService.getSchedulesByClassId(classId).subscribe(
      (data) => {
        this.schedule = data;
        console.log('Fetched schedule:', this.schedule);
      },
      (error) => {
        console.error('Error fetching schedule:', error);
      }
    );
  }

  submitReclamation(): void {
    this.reclamationService.createReclamation(this.reclamationData).subscribe(
      () => {
        alert('Reclamation submitted successfully!');
        this.toggleSupport();
        this.reclamationData = { name: '', email: this.userDetails.email, message: '' };
      },
      () => {
        alert('Failed to submit reclamation. Please try again.');
      }
    );
  }

  toggleProfile(): void {
    this.isProfileVisible = !this.isProfileVisible;
    this.closeOtherOverlays('details');
  }

  toggleProfileForm(): void {
    this.isProfileFormVisible = !this.isProfileFormVisible;
    this.closeOtherOverlays('profile');
  }

  toggleMessages(): void {
    this.isMessagesVisible = !this.isMessagesVisible;
  }

  toggleSchedule(): void {
    this.isScheduleVisible = !this.isScheduleVisible;
  }

  toggleSupport(): void {
    this.isSupportVisible = !this.isSupportVisible;
  }

  private closeOtherOverlays(activeOverlay: string): void {
    if (activeOverlay !== 'profile') this.isProfileFormVisible = false;
    if (activeOverlay !== 'details') this.isProfileVisible = false;
    if (activeOverlay !== 'schedule') this.isScheduleVisible = false;
    if (activeOverlay !== 'messages') this.isMessagesVisible = false;
    if (activeOverlay !== 'support') this.isSupportVisible = false;
  }

  logout(): void {
    this.authService.logout();
  }

  scrollToEventGroup(index: number): void {
    this.activeEventIndex = index;
    const container = document.getElementById('events-container');
    const groupWidth = 350 * 3;
    container?.scrollTo({ left: index * groupWidth, behavior: 'smooth' });
  }

  scrollToCourseGroup(index: number): void {
    this.activeCourseIndex = index;
    const container = document.getElementById('courses-container');
    const groupWidth = 100 * 3;
    container?.scrollTo({ left: index * groupWidth, behavior: 'smooth' });
  }
 // Print schedule
 printSchedule(): void {
  window.print();
}
updateActiveDot(containerId: string, activeIndexName: keyof this): void {
  const container = document.getElementById(containerId);
  const groupWidth = 200 * 3; // 3 cards per group (you can adjust this)

  if (container) {
    const scrollPosition = container.scrollLeft;
    const index = Math.floor(scrollPosition / groupWidth);

    // Dynamically access activeIndexName property and cast it as a number
    if (typeof this[activeIndexName] === 'number' && this[activeIndexName] !== index) {
      this[activeIndexName] = index as any; // Use 'as any' to bypass the type error
    }
  }
}


}
