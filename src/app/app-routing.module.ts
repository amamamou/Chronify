import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import components
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

// Admin-related components
import { AdminStudentsComponent } from './admin/admin-students/admin-students.component';
import { AdminTeachersComponent } from './admin/admin-teachers/admin-teachers.component';
import { AdminEstablishmentsComponent } from './admin/admin-establishments/admin-establishments.component';
import { AdminClassroomsComponent } from './admin/admin-classrooms/admin-classrooms.component';
import { AdminClassComponent } from './admin/admin-class/admin-class.component';
import { AdminCourseComponent } from './admin/admin-course/admin-course.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { TeacherHomeComponent } from './teacher/teacher-home/teacher-home.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AdminScheduleComponent } from './admin/admin-schedule/admin-schedule.component';

// Define routes
const routes: Routes = [
  // Non-admin routes
  { path: '', component: HomeComponent }, // Route for the home component
  { path: 'login', component: LoginComponent }, // Route for the login component
  { path: 'schedule', component: ScheduleComponent }, // Route for the login component

  // User-related routes
  { path: 'user', component: UserHomeComponent }, // Admin students management
  { path: 'teacher', component: TeacherHomeComponent }, // Admin students management

  // Admin-related routes
  { path: 'admin/home', component: AdminHomeComponent }, // Admin students management
  { path: 'admin/students', component: AdminStudentsComponent }, // Admin students management
  { path: 'admin/teachers', component: AdminTeachersComponent }, // Admin teachers management
  { path: 'admin/establishments', component: AdminEstablishmentsComponent }, // Admin establishments management
  { path: 'admin/classrooms', component: AdminClassroomsComponent }, // Admin classrooms management
  { path: 'admin/classes', component: AdminClassComponent }, // Admin classes management
  { path: 'admin/courses', component: AdminCourseComponent }, // Admin courses management
  { path: 'admin/schedule', component: AdminScheduleComponent }, // Admin courses management

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
