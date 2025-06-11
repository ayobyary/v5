import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Style } from '../interfaces/style.interface';
import { environment } from '../../environments/environment';
import { ApiResponse, PaginatedResponse } from '../models/api-response.model';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  private apiUrl = `${environment.apiUrl}/styles`;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  // دریافت تمام استایل‌ها
  getAllStyles(page: number = 1, limit: number = 10): Observable<PaginatedResponse<Style[]>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<PaginatedResponse<Style[]>>(this.apiUrl, { params })
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  // دریافت یک استایل خاص با ID
  getStyleById(id: number): Observable<Style> {
    return this.http.get<ApiResponse<Style>>(`${this.apiUrl}/${id}`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler.handleError)
      );
  }

  // جستجوی استایل‌ها
  searchStyles(query: string, page: number = 1, limit: number = 10): Observable<PaginatedResponse<Style[]>> {
    const params = new HttpParams()
      .set('query', query)
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<PaginatedResponse<Style[]>>(`${this.apiUrl}/search`, { params })
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  // فیلتر کردن استایل‌ها بر اساس دسته‌بندی
  filterStylesByCategory(
    category: 'all' | 'trend' | 'classic',
    page: number = 1,
    limit: number = 10
  ): Observable<PaginatedResponse<Style[]>> {
    const params = new HttpParams()
      .set('category', category)
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<PaginatedResponse<Style[]>>(`${this.apiUrl}/filter`, { params })
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  // دریافت استایل‌های مرتبط
  getRelatedStyles(styleId: number): Observable<Style[]> {
    return this.http.get<ApiResponse<Style[]>>(`${this.apiUrl}/${styleId}/related`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler.handleError)
      );
  }

  // دریافت استایل‌های والد
  getParentStyles(styleId: number): Observable<Style[]> {
    return this.http.get<ApiResponse<Style[]>>(`${this.apiUrl}/${styleId}/parents`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler.handleError)
      );
  }

  // دریافت استایل‌های فرزند
  getChildStyles(styleId: number): Observable<Style[]> {
    return this.http.get<ApiResponse<Style[]>>(`${this.apiUrl}/${styleId}/children`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler.handleError)
      );
  }

  // دریافت استایل‌های هیبرید
  getHybridStyles(styleId: number): Observable<Style[]> {
    return this.http.get<ApiResponse<Style[]>>(`${this.apiUrl}/${styleId}/hybrids`)
      .pipe(
        map(response => response.data),
        catchError(this.errorHandler.handleError)
      );
  }
} 