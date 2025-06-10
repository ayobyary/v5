import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  activeSection: string = 'body';
  sections = [
    { id: 'body', title: 'بدن شما', icon: 'body' },
    { id: 'interests', title: 'علایق شما', icon: 'favorite' },
    { id: 'styles', title: 'استایل ها', icon: 'style' },
    { id: 'settings', title: 'تنظیمات', icon: 'settings' }
  ];

  constructor() { }

  ngOnInit(): void { }

  setActiveSection(section: string): void {
    this.activeSection = section;
  }
} 