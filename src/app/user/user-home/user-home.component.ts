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
  classId: string; // Assuming classId is part of user details

  
}

export interface StudentProfile {
  id: number;
  name: string;
  institution: string;
  grade: string;
  classes: string[];
  email: string;
  phone?: string; // Optional field
  photoUrl?: string; // Optional field for profile picture
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
  events = [
    { image: 'assets/events/1.jpg' },
    { image: 'assets/events/2.jpg' },
    { image: 'assets/events/3.jpg' },
    { image: 'assets/events/4.jpg' },
    { image: 'assets/events/5.jpg' },
    { image: 'assets/events/6.jpg' },
    { image: 'assets/events/7.jpg' },
    { image: 'assets/events/8.jpg' },
    { image: 'assets/events/9.jpg' },
    { image: 'assets/events/10.jpg' }
  ];

  courses = [
    { image: 'assets/courses/1.jpg', title: 'Course 1' },
    { image: 'assets/courses/2.jpg', title: 'Course 2' },
    { image: 'assets/courses/3.jpg', title: 'Course 3' },
    { image: 'assets/courses/4.jpg', title: 'Course 4' },
    { image: 'assets/courses/5.jpg', title: 'Course 5' },
    { image: 'assets/courses/6.jpg', title: 'Course 6' },
    { image: 'assets/courses/7.jpg', title: 'Course 7' },
    { image: 'assets/courses/8.jpg', title: 'Course 8' },
    { image: 'assets/courses/9.jpg', title: 'Course 9' },
    { image: 'assets/courses/10.jpg', title: 'Course 10' }
  ];

  dashboardItems = [
    {
      title: "Profile Details",
      description: "Access your account information and personal details.",
      icon: "assets/user/1.png"
    },
   
    {
      title: "My Schedule",
      description: "Access your timetable, upcoming events, and deadlines.",
      icon: "assets/user/2.png"
    },
    {
      title: "Manage Profile",
      description: "Update personal information, change your password, or upload a profile picture.",
      icon: "assets/user/3.png"
    },
    {
      title: "Notifications",
      description: "View your latest updates, reminders, or alerts.",
      icon: "assets/user/4.png"
    },
  
    {
      title: "Messages",
      description: "Communicate with your instructors, peers, or support team.",
      icon: "assets/user/5.png"
    },
    {
      title: "Support Center",
      description: "Get help with common issues or contact support for assistance.",
      icon: "assets/user/6.png"
    },
    {
      title: "My Achievements",
      description: "Track your progress, certifications, and milestones.",
      icon: "assets/user/7.png"
    },
    {
      title: "Learning Resources",
      description: "Access study materials, guides, and helpful tools.",
      icon: "assets/user/8.png"
    }
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
    { sender: 'Support', subject: 'Password Reset', content: 'You requested a password reset. Click the link below.' }
  ];

  notifications = [
    { title: 'New Assignment', description: 'You have a new assignment due in 3 days.' },
    { title: 'System Update', description: 'A system update is scheduled for tomorrow.' },
    { title: 'Event Reminder', description: 'Your upcoming event is starting soon.' }
  ];

  userDetails: UserDetails = { username: '', email: '', cin: '', id: '', role: '', classId: '' };  // Include classId in userDetails
  // Object to hold user details

  printSchedule(): void {
    // Temporarily hide elements that should not be printed (e.g., buttons, headers)
    const elementsToHide = document.querySelectorAll('.no-print');
    elementsToHide.forEach(element => element.setAttribute('style', 'display: none;'));
  
    // Trigger the print dialog
    window.print();
  
    // After printing, restore the hidden elements
    elementsToHide.forEach(element => element.removeAttribute('style'));
  }
  schedule: any[] = [];  // To hold the filtered schedule


  dots = [0, 1, 2]; // 4 dots for navigation
  activeEventIndex = 0;
  activeCourseIndex = 0;

  [key: string]: any;  // This allows dynamic property access
  isProfileVisible = false;
  isProfileFormVisible = false;  // Property to control the overlay visibility
  isMessagesVisible = false;  // Property to control the messages overlay visibility
  isScheduleVisible: boolean = false;
  isSupportVisible: boolean = false;

  toggleProfile(): void {
    this.isProfileVisible = !this.isProfileVisible;
    this.closeOtherOverlays('details');
  }
  toggleProfileForm(): void {
    this.isProfileFormVisible = !this.isProfileFormVisible;
    this.closeOtherOverlays('profile');
  }
  toggleMessages() {
    this.isMessagesVisible = !this.isMessagesVisible;  // Toggle messages visibility
  }
  toggleSchedule() {
    this.isScheduleVisible = !this.isScheduleVisible;
  }
  toggleSupport() {
    this.isSupportVisible = !this.isSupportVisible;
  }
   
     // Close other overlays when one is opened
  private closeOtherOverlays(activeOverlay: string): void {
    if (activeOverlay !== 'profile') this.isProfileFormVisible = false;
    if (activeOverlay !== 'details') this.isProfileVisible = false;

    if (activeOverlay !== 'schedule') this.isScheduleVisible = false;
    if (activeOverlay !== 'messages') this.isMessagesVisible = false;
    if (activeOverlay !== 'support') this.isSupportVisible = false;
  }
  logout() {
    this.authService.logout(); // Call the logout method from AuthService
  }
  scrollToEventGroup(index: number): void {
    this.activeEventIndex = index;
    const container = document.getElementById('events-container');
    const groupWidth = 350 * 3; // 3 cards per group (you can adjust this)
    if (container) {
      container.scrollTo({
        left: index * groupWidth,
        behavior: 'smooth'
      });
    }
  }

  scrollToCourseGroup(index: number): void {
    this.activeCourseIndex = index;
    const container = document.getElementById('courses-container');
    const groupWidth = 100 * 3; // 3 cards per group (you can adjust this)
    if (container) {
      container.scrollTo({
        left: index * groupWidth,
        behavior: 'smooth'
      });
    }
  }

  updateActiveDot(containerId: string, activeIndexName: string): void {
    const container = document.getElementById(containerId);
    const groupWidth = 200 * 3; // 3 cards per group (you can adjust this)

    if (container) {
      const scrollPosition = container.scrollLeft;
      const index = Math.floor(scrollPosition / groupWidth);
      
      // Dynamically access activeIndexName property
      if (this[activeIndexName] !== index) {
        this[activeIndexName] = index;
      }
    }
  }
 
  constructor(private authService: AuthService,private reclamationService: ReclamationService,  private scheduleService: ScheduleService  // Inject ScheduleService
  ) {}

  ngOnInit(): void {
    // Fetch user details from AuthService
    const fetchedDetails = this.authService.getUserDetails();
    if (fetchedDetails) {
      this.userDetails = fetchedDetails;
      console.log('Logged in user details:', this.userDetails);
      
      // Fetch the schedule based on the classId
      this.getScheduleByClassId(this.userDetails.classId);
    } else {
      console.error('No user details found. Please log in.');
    }
  }

  // Fetch the full schedule filtered by classId
  getScheduleByClassId(classId: string): void {
    this.scheduleService.getSchedulesByClassId(classId).subscribe(
      (data) => {
        this.schedule = data;  // Store the full schedule
        console.log('Fetched schedule:', this.schedule);
      },
      (error) => {
        console.error('Error fetching schedule:', error);
      }
    );
  }
  submitReclamation() {
    this.reclamationService.createReclamation(this.reclamationData).subscribe(
      (response) => {
        alert('Reclamation submitted successfully!');
        this.toggleSupport();
  
        // Reset form but retain the user's email
        this.reclamationData = { 
          name: '', 
          email: this.userDetails.email, 
          message: '' 
        };
      },
      (error) => {
        alert('Failed to submit reclamation. Please try again.');
      }
    );
  }
    
}
