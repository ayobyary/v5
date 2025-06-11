import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StyleService } from '../../../../services/style.service';
import { Style } from '../../../../interfaces/style.interface';

@Component({
  selector: 'app-style-detail',
  templateUrl: './style-detail.component.html',
  styleUrls: ['./style-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class StyleDetailComponent implements OnInit {
  style: Style | null = null;
  relatedStyles: Style[] = [];
  parentStyles: Style[] = [];
  childStyles: Style[] = [];
  hybridStyles: Style[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private styleService: StyleService
  ) {}

  ngOnInit(): void {
    const styleId = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(styleId)) {
      this.error = 'شناسه استایل نامعتبر است';
      this.loading = false;
      return;
    }

    this.loadStyleDetails(styleId);
  }

  private loadStyleDetails(styleId: number): void {
    this.styleService.getStyleById(styleId).subscribe({
      next: (style) => {
        this.style = style;
        this.loadRelatedData(styleId);
      },
      error: (error) => {
        this.error = 'خطا در بارگذاری اطلاعات استایل';
        this.loading = false;
        console.error('Error loading style:', error);
      }
    });
  }

  private loadRelatedData(styleId: number): void {
    // Load related styles
    this.styleService.getRelatedStyles(styleId).subscribe({
      next: (styles) => this.relatedStyles = styles,
      error: (error) => console.error('Error loading related styles:', error)
    });

    // Load parent styles
    this.styleService.getParentStyles(styleId).subscribe({
      next: (styles) => this.parentStyles = styles,
      error: (error) => console.error('Error loading parent styles:', error)
    });

    // Load child styles
    this.styleService.getChildStyles(styleId).subscribe({
      next: (styles) => this.childStyles = styles,
      error: (error) => console.error('Error loading child styles:', error)
    });

    // Load hybrid styles
    this.styleService.getHybridStyles(styleId).subscribe({
      next: (styles) => this.hybridStyles = styles,
      error: (error) => console.error('Error loading hybrid styles:', error)
    });

    this.loading = false;
  }
} 