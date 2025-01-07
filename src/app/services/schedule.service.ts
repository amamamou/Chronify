import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private apiUrl = 'http://localhost:3000/schedule'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Add schedule method
  addSchedule(newSchedule: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newSchedule);
  }

  // Other methods like fetching schedules
  getSchedules(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Fetch schedules by classId
  getSchedulesByClassId(classId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/schedules/${classId}`);
  }
}
