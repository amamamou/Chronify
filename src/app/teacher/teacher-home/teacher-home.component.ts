import { Component } from '@angular/core';
interface Message {
  sender: string;
  subject: string;
  content: string;
}
export interface TeacherProfile {
  id: number;
  name: string;
  institution: string;
  subjects: string[];
  classes: string[];
  email: string;
  phone?: string; // Optional field
  photoUrl?: string; // Optional field for profile picture
}
@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.css']
})
export class TeacherHomeComponent {
  teacherProfile: TeacherProfile = {
    id: 1,
    name: 'John Doe',
    institution: 'Elite International Academy',
    subjects: ['Mathematics', 'Physics'],
    classes: ['Grade 10', 'Grade 11'],
    email: 'johndoe@eliteacademy.com',
    phone: '+1 234 567 890',
    photoUrl: 'assets/teacher1.jpg',
  };
  events = [
    { image: 'assets/conf/1.jpg' },
    { image: 'assets/conf/2.jpg' },
    { image: 'assets/conf/3.jpg' },
    { image: 'assets/conf/4.jpg' },
    { image: 'assets/conf/5.jpg' },
    { image: 'assets/conf/6.jpg' },
    { image: 'assets/conf/7.jpg' },
    { image: 'assets/conf/8.jpg' },
    { image: 'assets/conf/9.jpg' },
    { image: 'assets/conf/10.jpg' }
  ];

  courses = [
    { image: 'assets/sem/1.jpg', title: 'Course 1' },
    { image: 'assets/sem/2.jpg', title: 'Course 2' },
    { image: 'assets/sem/3.jpg', title: 'Course 3' },
    { image: 'assets/sem/4.jpg', title: 'Course 4' },
    { image: 'assets/sem/5.jpg', title: 'Course 5' },
    { image: 'assets/sem/1.jpg', title: 'Course 1' },
    { image: 'assets/sem/2.jpg', title: 'Course 2' },
    { image: 'assets/sem/3.jpg', title: 'Course 3' },
    { image: 'assets/sem/4.jpg', title: 'Course 4' },
    { image: 'assets/sem/5.jpg', title: 'Course 5' },
  ];

  dashboardItems = [
    {
      title: "Profile Details",
      description: "Access your account information and personal details.",
      icon: "assets/user/1.png"
    },
    {
      title: "Manage Profile",
      description: "Update personal information, change your password, or upload a profile picture.",
      icon: "assets/user/3.png"
    },
    {
      title: "My Schedule",
      description: "Access your timetable, upcoming events, and deadlines.",
      icon: "assets/user/2.png"
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

  schedule = [
    { day: 'Monday', time: '9:00 AM - 10:00 AM', subject: 'Math 101' },
    { day: 'Monday', time: '10:00 AM - 12:00 PM', subject: 'Physics 101' },
    { day: 'Tuesday', time: '9:00 AM - 11:00 AM', subject: 'Chemistry 101' },
    { day: 'Wednesday', time: '1:00 PM - 3:00 PM', subject: 'History 101' }
  ];


  // Visibility flags for overlays
  isProfileVisible = false;
  isProfileFormVisible = false;
  isScheduleVisible = false;
  isMessagesVisible = false;
  isSupportVisible = false;
  dots = [0, 1, 2]; // 4 dots for navigation
  activeEventIndex = 0;
  activeCourseIndex = 0;

  [key: string]: any;  // This allows dynamic property access
  // Methods to toggle visibility

  toggleProfile(): void {
    this.isProfileVisible = !this.isProfileVisible;
    this.closeOtherOverlays('details');
  }
  toggleProfileForm(): void {
    this.isProfileFormVisible = !this.isProfileFormVisible;
    this.closeOtherOverlays('profile');
  }

  toggleSchedule(): void {
    this.isScheduleVisible = !this.isScheduleVisible;
    this.closeOtherOverlays('schedule');
  }

  toggleMessages(): void {
    this.isMessagesVisible = !this.isMessagesVisible;
    this.closeOtherOverlays('messages');
  }

  toggleSupport(): void {
    this.isSupportVisible = !this.isSupportVisible;
    this.closeOtherOverlays('support');
  }

  // Close other overlays when one is opened
  private closeOtherOverlays(activeOverlay: string): void {
    if (activeOverlay !== 'profile') this.isProfileFormVisible = false;
    if (activeOverlay !== 'details') this.isProfileVisible = false;

    if (activeOverlay !== 'schedule') this.isScheduleVisible = false;
    if (activeOverlay !== 'messages') this.isMessagesVisible = false;
    if (activeOverlay !== 'support') this.isSupportVisible = false;
  }

  // Print schedule
  printSchedule(): void {
    window.print();
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
}
