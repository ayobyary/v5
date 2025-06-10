import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent {
  isSidenavOpen = true;

  isMenuOpen = false;


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


  @ViewChild('drawer') drawer!: MatSidenav;
  isWide = true; // یا بر اساس عرض صفحه تعیین کن

} 