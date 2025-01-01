import { Component } from '@angular/core';

interface Message {
  sender: string;
  subject: string;
  content: string;
}

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {
  selectedMessage: Message | null = null;

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
      title: "Manage Profile",
      description: "Update personal information, change your password, or upload a profile picture.",
      icon: "assets/user/1.png"
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
      title: "Settings",
      description: "Customize your preferences, including themes and privacy options.",
      icon: "assets/user/3.png"
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

  printSchedule() {
    window.print();
  }

  dots = [0, 1, 2]; // 4 dots for navigation
  activeEventIndex = 0;
  activeCourseIndex = 0;

  [key: string]: any;  // This allows dynamic property access

  isProfileFormVisible = false;  // Property to control the overlay visibility
  isMessagesVisible = false;  // Property to control the messages overlay visibility
  isScheduleVisible: boolean = false;
  isSupportVisible: boolean = false;

  toggleProfileForm() {
    this.isProfileFormVisible = !this.isProfileFormVisible;  // Toggle form visibility
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
