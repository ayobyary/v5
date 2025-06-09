import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  userData: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
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
} 