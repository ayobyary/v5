import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  settingsForm: FormGroup;
  passwordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.settingsForm = this.fb.group({
      language: ['fa'],
      theme: ['light'],
      notifications: [true],
      emailNotifications: [true]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadSettings();
  }

  loadSettings() {
    this.authService.getUserSettings().subscribe(
      (settings) => {
        this.settingsForm.patchValue(settings);
      },
      (error) => {
        console.error('Error loading settings:', error);
      }
    );
  }

  onSettingsSubmit() {
    if (this.settingsForm.valid) {
      this.authService.updateSettings(this.settingsForm.value).subscribe(
        (response) => {
          console.log('Settings updated successfully');
        },
        (error) => {
          console.error('Error updating settings:', error);
        }
      );
    }
  }

  onChangePassword() {
    if (this.passwordForm.valid) {
      if (this.passwordForm.get('newPassword')?.value !== this.passwordForm.get('confirmPassword')?.value) {
        // نمایش خطای عدم تطابق رمز عبور
        return;
      }

      this.authService.changePassword(this.passwordForm.value).subscribe(
        (response) => {
          console.log('Password changed successfully');
          this.passwordForm.reset();
        },
        (error) => {
          console.error('Error changing password:', error);
        }
      );
    }
  }
} 