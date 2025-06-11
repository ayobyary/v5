import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StyleService } from '../../../../services/style.service';
import { Style } from '../../../../models/style.model';

@Component({
  selector: 'app-user-style-detail',
  templateUrl: './user-style-detail.component.html',
  styleUrls: ['./user-style-detail.component.scss']
})
export class UserStyleDetailComponent implements OnInit {
  style: Style | null = null;
  loading = true;
  error = false;
  styleId: number;

  constructor(
    private route: ActivatedRoute,
    private styleService: StyleService
  ) {
    this.styleId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadStyleDetails(this.styleId);
  }

  loadStyleDetails(id: number): void {
    this.loading = true;
    this.error = false;

    this.styleService.getStyleById(id).subscribe({
      next: (data: Style) => {
        this.style = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading style details:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }
} 