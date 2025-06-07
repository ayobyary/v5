import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  adminData: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loadAdminData();
  }

  loadAdminData() {
    this.authService.getAdminDashboard().subscribe(
      (data) => {
        this.adminData = data;
      },
      (error) => {
        console.error('Error loading admin data:', error);
      }
    );
  }
} 