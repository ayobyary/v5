import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  userData: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.authService.getUserDashboard().subscribe(
      (data) => {
        this.userData = data;
      },
      (error) => {
        console.error('Error loading user data:', error);
      }
    );
  }
} 