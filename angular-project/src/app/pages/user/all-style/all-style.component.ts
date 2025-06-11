import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-all-style',
  standalone: true,
  imports: [],
  templateUrl: './all-style.component.html',
  styleUrl: './all-style.component.scss'
})
export class AllStyleComponent {
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
