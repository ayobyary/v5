import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  userData: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder   
  ) {
    this.profileForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: [''],
      address: ['']
    });
  }

  ngOnInit() {
    this.loadUserData();
    this.slideInterval = setInterval(() => {
      this.nextImage();
    }, 4000);
  }

  loadUserData() {
    this.authService.getUserProfile().subscribe(
      (data) => {
        this.userData = data;
        this.profileForm.patchValue(data);
      },
      (error) => {
        console.error('Error loading profile:', error);
      }
    );
    this.authService.getUserDashboard().subscribe(
      (data) => {
        this.userData = data;
      },
      (error) => {
        console.error('Error loading user data:', error);
        this.snackBar.open('خطا در بارگذاری اطلاعات کاربر', 'بستن', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    );
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.authService.updateProfile(this.profileForm.value).subscribe(
        (response) => {
          console.log('Profile updated successfully');
        },
        (error) => {
          console.error('Error updating profile:', error);
        }
      );
    }
  }





  
  mainImages: string[] = [
    'assets/images/Shop Women\'s Accessories.jpeg',
    'assets/images/download (1).jpeg',
    'assets/images/download (2).jpeg'
  ];
  currentImageIndex: number = 0;
  slideInterval: any;

 


  ngOnDestroy() {
    clearInterval(this.slideInterval);
  }



  shopNow() {
    this.snackBar.open('🛍️ به زودی فروشگاه راه‌اندازی می‌شود!', 'بستن', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['info-snackbar']
    });
  }

  exploreCategory(category: string) {
    this.snackBar.open(`🔍 کاوش در دسته‌بندی ${category.toUpperCase()}`, 'بستن', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['info-snackbar']
    });
  }

  learnMore() {
    this.snackBar.open('📚 بخش اطلاعات بیشتر به زودی اضافه می‌شود', 'بستن', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['info-snackbar']
    });
  }

  contactUs() {
    this.snackBar.open('📞 با ما در تماس باشید: info@puremdda.com', 'بستن', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['info-snackbar']
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.snackBar.open('👋 شما با موفقیت خارج شدید', 'بستن', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
    this.router.navigate(['/login']);
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.mainImages.length;
  }

  prevImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.mainImages.length) % this.mainImages.length;
  }

  goToImage(idx: number) {
    this.currentImageIndex = idx;
  }











} 