import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private apiUrl = 'http://localhost:3000/subjects';

  constructor(private http: HttpClient) {}

  // Get all subjects
  getAllSubjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get a specific subject by ID
  getSubjectById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Create a new subject
  createSubject(subject: { name: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, subject);
  }


 // Method to update a subject (course)
 updateSubject(id: number, course: { name: string }): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/${id}`, course); // Ensure the second parameter is the correct object
}
  // Delete a subject by ID
  deleteSubject(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
