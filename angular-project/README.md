# Frontend - Angular Application

Modern Angular frontend application with Material Design and Tailwind CSS.

---

# فرانت‌اند - برنامه Angular

برنامه فرانت‌اند Angular مدرن با Material Design و Tailwind CSS.

---

## Prerequisites | پیش‌نیازها

- Node.js (v14 or higher | نسخه 14 یا بالاتر)
- npm (v6 or higher | نسخه 6 یا بالاتر)
- Angular CLI (v15 or higher | نسخه 15 یا بالاتر)

**Install Angular CLI globally | نصب Angular CLI به صورت سراسری:**
```bash
npm install -g @angular/cli
```

---

## Installation | نصب

```bash
npm install
```

---

## Development Server | سرور توسعه

Run the development server:

سرور توسعه را اجرا کنید:

```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

به `http://localhost:4200/` بروید. برنامه به صورت خودکار در صورت تغییر فایل‌های منبع، بازبارگذاری می‌شود.

---

## Configuration | پیکربندی

### API URL Configuration | پیکربندی URL API

The API URL is configured in `src/environments/environment.ts`:

URL API در `src/environments/environment.ts` پیکربندی شده است:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'  // Backend API URL
};
```

**Important | مهم:** Make sure your backend server is running on port 3000, or update this URL accordingly.

مطمئن شوید که سرور بک‌اند شما روی پورت 3000 در حال اجرا است، یا این URL را بر اساس آن به‌روزرسانی کنید.

---

## Build | ساخت

### Development Build | ساخت توسعه:

```bash
npm run build
# or
ng build
```

### Production Build | ساخت تولید:

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

فایل‌های ساخته شده در پوشه `dist/` ذخیره می‌شوند.

---

## Default Login Credentials | اطلاعات ورود پیش‌فرض

### Admin Account | حساب مدیر:
- **Email:** `admin@example.com`
- **Password:** `admin123`

### User Accounts | حساب‌های کاربری:
- **User 1:**
  - Email: `user1@example.com`
  - Password: `user123`

- **User 2:**
  - Email: `user2@example.com`
  - Password: `user223`

---

## Features | ویژگی‌ها

- ✅ Angular 17.3.0
- ✅ Angular Material 17.3.10 - UI Components
- ✅ Tailwind CSS 3.4.17 - Utility-first CSS
- ✅ Responsive Design | طراحی واکنش‌گرا
- ✅ Authentication System | سیستم احراز هویت
  - Login | ورود
  - Register | ثبت‌نام
  - Signup | ثبت‌نام (آلترناتیو)
  - Forgot Password | فراموشی رمز عبور
- ✅ User Dashboard | داشبورد کاربر
- ✅ Admin Dashboard | داشبورد مدیر
- ✅ Route Guards | محافظ‌های مسیر
- ✅ HTTP Interceptors | اینترسپتورهای HTTP
- ✅ JWT Token Management | مدیریت توکن JWT

---

## Project Structure | ساختار پروژه

```
angular-project/
├── src/
│   ├── app/
│   │   ├── pages/           # Page components | کامپوننت‌های صفحات
│   │   │   ├── login/       # Login page | صفحه ورود
│   │   │   ├── register/    # Register page | صفحه ثبت‌نام
│   │   │   ├── signup/      # Signup page | صفحه ثبت‌نام
│   │   │   ├── forgot-password/  # Forgot password page | صفحه فراموشی رمز
│   │   │   ├── user/        # User dashboard | داشبورد کاربر
│   │   │   └── admin/       # Admin dashboard | داشبورد مدیر
│   │   ├── guards/          # Route guards | محافظ‌های مسیر
│   │   ├── interceptors/    # HTTP interceptors | اینترسپتورهای HTTP
│   │   └── services/        # Services | سرویس‌ها
│   ├── assets/              # Static assets | فایل‌های استاتیک
│   └── environments/        # Environment configs | پیکربندی محیط
├── angular.json             # Angular configuration
├── package.json             # Dependencies
└── tsconfig.json            # TypeScript configuration
```

---

## Available Routes | مسیرهای موجود

- `/` - Redirects to `/login` | هدایت به `/login`
- `/login` - Login page | صفحه ورود
- `/register` - Register page | صفحه ثبت‌نام
- `/signup` - Signup page | صفحه ثبت‌نام
- `/forgot-password` - Forgot password page | صفحه فراموشی رمز
- `/user/dashboard` - User dashboard | داشبورد کاربر
- `/admin/dashboard` - Admin dashboard | داشبورد مدیر

---

## Technologies Used | تکنولوژی‌های استفاده شده

### Core | اصلی:
- Angular 17.3.0
- TypeScript 5.4.2
- RxJS 7.8.0

### UI Libraries | کتابخانه‌های UI:
- Angular Material 17.3.10
- Tailwind CSS 3.4.17

### Build Tools | ابزارهای ساخت:
- Angular CLI 17.3.17
- Autoprefixer 10.4.21
- PostCSS 8.5.4

---

## Running Unit Tests | اجرای تست‌های واحد

```bash
ng test
```

---

## Code Scaffolding | ایجاد کد

Generate a new component:

ایجاد یک کامپوننت جدید:

```bash
ng generate component component-name
```

You can also use:
می‌توانید از دستورات زیر نیز استفاده کنید:

- `ng generate directive|pipe|service|class|guard|interface|enum|module`

---

## Troubleshooting | عیب‌یابی

### Port Already in Use | خطا: پورت در حال استفاده است

If port 4200 is already in use, run:

اگر پورت 4200 در حال استفاده است، اجرا کنید:

```bash
ng serve --port 4201
```

### Cannot Connect to Backend | اتصال به بک‌اند برقرار نمی‌شود

1. Make sure the backend server is running on port 3000
   مطمئن شوید سرور بک‌اند روی پورت 3000 در حال اجرا است

2. Check the API URL in `src/environments/environment.ts`
   URL API را در `src/environments/environment.ts` بررسی کنید

3. Check CORS configuration in backend
   پیکربندی CORS را در بک‌اند بررسی کنید

---

## Further Help | راهنمای بیشتر

For more information, visit:
برای اطلاعات بیشتر، مراجعه کنید:

- [Angular Documentation](https://angular.io/docs)
- [Angular CLI Overview](https://angular.io/cli)

---

## License | مجوز

This project is open source | این پروژه متن‌باز است.

---
