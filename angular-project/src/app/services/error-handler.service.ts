import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'خطایی رخ داده است. لطفا دوباره تلاش کنید.';

    if (error.error instanceof ErrorEvent) {
      // خطای سمت کلاینت
      errorMessage = error.error.message;
    } else {
      // خطای سمت سرور
      if (error.error?.message) {
        errorMessage = error.error.message;
      } else {
        switch (error.status) {
          case 400:
            errorMessage = 'درخواست نامعتبر است.';
            break;
          case 401:
            errorMessage = 'لطفا وارد حساب کاربری خود شوید.';
            break;
          case 403:
            errorMessage = 'شما دسترسی لازم را ندارید.';
            break;
          case 404:
            errorMessage = 'مورد درخواستی یافت نشد.';
            break;
          case 500:
            errorMessage = 'خطای سرور. لطفا بعدا تلاش کنید.';
            break;
          default:
            errorMessage = 'خطای ناشناخته.';
        }
      }
    }

    console.error('An error occurred:', error);
    return throwError(() => new Error(errorMessage));
  }
} 