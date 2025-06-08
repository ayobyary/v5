import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
  }

  register(email: string, password: string, role: string = 'user', phone?: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, { email, password, role, phone });
  }

  getUserDashboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/dashboard`);
  }

  getAdminDashboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/dashboard`);
  }
} 