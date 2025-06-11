import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Style } from '../../../../interfaces/style.interface';
import { StyleService } from '../../../../services/style.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-all-style',
  templateUrl: './all-style.component.html',
  styleUrls: ['./all-style.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class AllStyleComponent implements OnInit {
  styles: Style[] = [];
  loading = true;
  error: string | null = null;
  searchTerm: string = '';
  selectedCategory: string = 'all';
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  totalPages = 0;
  private searchSubject = new Subject<string>();

  constructor(private styleService: StyleService) {
    // تنظیم جستجو با تاخیر
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.currentPage = 1;
        this.loadStyles();
      });
  }

  ngOnInit(): void {
    this.loadStyles();
  }

  loadStyles(): void {
    this.loading = true;
    this.error = null;

    const request = this.searchTerm
      ? this.styleService.searchStyles(this.searchTerm, this.currentPage, this.itemsPerPage)
      : this.selectedCategory === 'all'
        ? this.styleService.getAllStyles(this.currentPage, this.itemsPerPage)
        : this.styleService.filterStylesByCategory(this.selectedCategory as 'trend' | 'classic', this.currentPage, this.itemsPerPage);

    request.subscribe({
      next: (response) => {
        this.styles = response.data;
        this.totalItems = response.pagination.total;
        this.totalPages = response.pagination.totalPages;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      }
    });
  }

  onSearchChange(): void {
    this.searchSubject.next(this.searchTerm);
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.currentPage = 1;
    this.loadStyles();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadStyles();
  }

  get pages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
} 