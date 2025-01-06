import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent {
  users: User[] = [];
  searchQuery: string = '';
  userForm: Partial<User> = {
    username: '',
    cin: '',
    email: '',
    password: '',
    role: 'admin',
  };
  isUpdating: boolean = false;
  currentUserId: number | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Load all users
  loadUsers(): void {
    this.userService.findAll().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Error loading users:', err);
      },
    });
  }

  // Search users
  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.users = this.users.filter(
      (user) =>
        user.username.toLowerCase().includes(query) ||
        user.cin.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
  }

  // Create a new user
  createUser(): void {
    this.userService.create(this.userForm).subscribe({
      next: (data) => {
        this.users.push(data);
        this.resetForm();
      },
      error: (err) => {
        console.error('Error creating user:', err);
      },
    });
  }

  // Open update form with pre-filled data
  openUpdateForm(user: User): void {
    this.isUpdating = true;
    this.currentUserId = user.id || null;
    this.userForm = { ...user };
  }

  // Update user details
  updateUser(): void {
    if (this.currentUserId !== null) {
      this.userService.update(this.currentUserId, this.userForm).subscribe({
        next: (updatedUser) => {
          const index = this.users.findIndex((u) => u.id === this.currentUserId);
          if (index !== -1) {
            this.users[index] = updatedUser;
          }
          this.resetForm();
        },
        error: (err) => {
          console.error('Error updating user:', err);
        },
      });
    }
  }

  // Delete a user
  deleteUser(userId: number): void {
    this.userService.delete(userId).subscribe({
      next: () => {
        this.users = this.users.filter((user) => user.id !== userId);
      },
      error: (err) => {
        console.error('Error deleting user:', err);
      },
    });
  }

  // Reset form and state
  resetForm(): void {
    this.isUpdating = false;
    this.currentUserId = null;
    this.userForm = {
      username: '',
      cin: '',
      email: '',
      password: '',
      role: 'admin',
    };
  }
}