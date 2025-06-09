import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  notificationCount = 0;
  notifications: any[] = [];
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.loadNotifications();
  }
  
  toggleSidenav() {
    // پیاده‌سازی toggle sidenav
  }
  
  loadNotifications() {
    // بارگذاری اعلان‌ها از سرویس
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 