import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminStudentsComponent } from './admin/admin-students/admin-students.component';
import { AdminTeachersComponent } from './admin/admin-teachers/admin-teachers.component';
import { AdminEstablishmentsComponent } from './admin/admin-establishments/admin-establishments.component';
import { AdminClassroomsComponent } from './admin/admin-classrooms/admin-classrooms.component';
import { AdminClassComponent } from './admin/admin-class/admin-class.component';
import { AdminCourseComponent } from './admin/admin-course/admin-course.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AdminStudentsComponent,
    AdminTeachersComponent,
    AdminEstablishmentsComponent,
    AdminClassroomsComponent,
    AdminClassComponent,
    AdminCourseComponent,
    AdminSidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
