import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
    private apiUrl = 'http://localhost:3000/teachers';  // Adjust the URL if needed

  constructor(private http: HttpClient) {}

  // Fetch all teachers
  getTeachers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Fetch a teacher by ID
  getTeacherById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Add a new teacher
  addTeacher(name: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { name });
  }

  // Delete a teacher by ID
  deleteTeacher(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
