import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private baseUrl = 'http://localhost:3000/teachers'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getAllTeachers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  addTeacher(teacher: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, teacher);
  }

  deleteTeacher(teacherId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${teacherId}`);
  }
 
}
