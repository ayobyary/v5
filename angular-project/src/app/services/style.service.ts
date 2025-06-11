import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Style } from '../models/style.model';
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
  getAllStyles(page: number = 1, limit: number = 10): Observable<PaginatedResponse<Style>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<PaginatedResponse<Style>>(this.apiUrl, { params })
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

  // دریافت اکسسوری‌های یک استایل
  getStyleAccessories(styleId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${styleId}/accessories`);
  }

  // دریافت برندهای یک استایل
  getStyleBrands(styleId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${styleId}/brands`);
  }

  // دریافت پروفایل روانشناختی یک استایل
  getStylePsychologicalProfile(styleId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${styleId}/psychological-profile`);
  }

  // دریافت رویدادهای یک استایل
  getStyleEvents(styleId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${styleId}/events`);
  }

  // دریافت مکان‌های یک استایل
  getStyleLocations(styleId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${styleId}/locations`);
  }

  // دریافت ترکیب‌های یک استایل
  getStyleCombinations(styleId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${styleId}/combinations`);
  }

  // دریافت حالات یک استایل
  getStyleMoods(styleId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${styleId}/moods`);
  }

  // دریافت پالت رنگی یک استایل
  getStyleColorPalette(styleId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${styleId}/color-palette`);
  }

  // دریافت پارچه‌های یک استایل
  getStyleFabrics(styleId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${styleId}/fabrics`);
  }

  // دریافت آیکون‌های یک استایل
  getStyleIcons(styleId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${styleId}/icons`);
  }

  // دریافت نمادهای یک استایل
  getStyleSymbols(styleId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${styleId}/symbols`);
  }

  // دریافت انتقادات یک استایل
  getStyleCriticisms(styleId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${styleId}/criticisms`);
  }

  // دریافت آرایش و مو یک استایل
  getStyleHairAndMakeup(styleId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${styleId}/hair-and-makeup`);
  }

  // دریافت وضعیت ترند یک استایل
  getStyleTrendStatus(styleId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${styleId}/trend-status`);
  }

  // دریافت مراجع رسانه‌ای یک استایل
  getStyleMediaReferences(styleId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${styleId}/media-references`);
  }

  // دریافت استایل‌های ترکیبی
  getStyleHybrids(styleId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${styleId}/hybrids`);
  }

  // دریافت کاربرد امروزی یک استایل
  getStyleUsageToday(styleId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${styleId}/usage-today`);
  }

  // دریافت تکامل تاریخی یک استایل
  getStyleHistoricalEvolution(styleId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${styleId}/historical-evolution`);
  }

  // دریافت استایل‌های متضاد
  getStyleContrastingStyles(styleId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${styleId}/contrasting-styles`);
  }

  // دریافت گروه‌های سنی یک استایل
  getStyleAgeGroups(styleId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${styleId}/age-groups`);
  }

  // دریافت مکان‌های مبدا یک استایل
  getStyleOriginLocations(styleId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${styleId}/origin-locations`);
  }
} 