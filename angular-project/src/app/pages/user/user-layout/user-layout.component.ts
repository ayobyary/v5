import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent {
  isSidenavOpen = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 