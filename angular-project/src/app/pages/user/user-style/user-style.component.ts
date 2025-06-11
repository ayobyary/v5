import { Component, OnInit, ViewChild } from '@angular/core';
import { StyleService } from '../../../services/style.service';
import { Style } from '../../../models/style.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PaginatedResponse } from '../../../models/api-response.model';

@Component({
  selector: 'app-user-style',
  templateUrl: './user-style.component.html',
  styleUrls: ['./user-style.component.scss']
})
export class UserStyleComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  styles: Style[] = [];
  loading = true;
  error = false;
  total = 0;
  pageSize = 10;
  currentPage = 0;

  constructor(private styleService: StyleService) { }

  ngOnInit(): void {
    this.loadStyles();
  }

  loadStyles(): void {
    this.loading = true;
    this.error = false;

    this.styleService.getAllStyles(this.currentPage + 1, this.pageSize).subscribe({
      next: (response: PaginatedResponse<Style>) => {
        this.styles = response.data;
        this.total = response.total;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading styles:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadStyles();
  }
} 