import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, { email, password });
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/profile`);
  }

  updateProfile(profileData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/user/profile`, profileData);
  }

  getUserSettings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/settings`);
  }

  updateSettings(settings: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/user/settings`, settings);
  }

  changePassword(passwordData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/change-password`, passwordData);
  }

  getUserDashboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/dashboard`);
  }

  getAdminDashboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/dashboard`);
  }
} 