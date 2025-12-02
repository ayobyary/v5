import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { interval, Subscription } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  
  hidePassword = true;
  isLoading = false;
  currentSlide = 0;
  private autoSlideSubscription?: Subscription;
  errorMessage = '';

  slides = [
    {
      image: 'assets/images/Shop Women\'s Accessories.jpeg',
      alt: 'Women\'s Accessories Shop'
    },
    {
      image: 'assets/images/Black & Silver Metallic Woven Hat.jpeg',
      alt: 'Black & Silver Metallic Woven Hat'
    },
    {
      image: 'assets/images/download.jpeg',
      alt: 'Fashion Accessories 1'
    },
    {
      image: 'assets/images/download (1).jpeg',
      alt: 'Fashion Accessories 2'
    },
    {
      image: 'assets/images/download (2).jpeg',
      alt: 'Fashion Accessories 3'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerSocialIcons();
  }

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    if (this.autoSlideSubscription) {
      this.autoSlideSubscription.unsubscribe();
    }
  }

  private startAutoSlide() {
    this.autoSlideSubscription = interval(5000).subscribe(() => {
      this.nextSlide();
    });
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  previousSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  private registerSocialIcons() {
    const icons = [
      { name: 'google', url: 'assets/icons/google.svg' },
      { name: 'facebook', url: 'assets/icons/facebook.svg' },
      { name: 'twitter', url: 'assets/icons/twitter.svg' }
    ];

    icons.forEach(icon => {
      this.iconRegistry.addSvgIcon(
        icon.name,
        this.sanitizer.bypassSecurityTrustResourceUrl(icon.url)
      );
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      try {
        const { username, password } = this.loginForm.value;
        const response = await firstValueFrom(this.authService.login(username, password));
        console.log('Login response:', response);
        
        // ذخیره توکن در localStorage
        localStorage.setItem('token', response.token);
        
        // هدایت کاربر بر اساس نقش
        if (response.role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/user/dashboard']);
        }
      } catch (error: any) {
        console.error('Login error:', error);
        this.errorMessage = error.error?.message || 'An error occurred during login';
      } finally {
        this.isLoading = false;
      }
    }
  }

  onSocialLogin(provider: string) {
    console.log(`Logging in with ${provider}`);
    // پیاده‌سازی ورود با شبکه‌های اجتماعی در آینده
  }
} 