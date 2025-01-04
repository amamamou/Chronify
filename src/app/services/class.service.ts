import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  private baseUrl = 'http://localhost:3000/classes'; // Adjust URL as needed

  constructor(private http: HttpClient) {}

  // Fetch all classes
  getClasses(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Fetch students for a class
  getStudentsByClass(classId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${classId}/students`);
  }

  // Add a new class
  addClass(classData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, classData);
  }

  // Delete a class
  deleteClass(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
