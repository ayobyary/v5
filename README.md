# V5 Project

A full-stack application with Angular frontend and Node.js backend.

---

# پروژه V5

یک برنامه فول‌استک با فرانت‌اند Angular و بک‌اند Node.js.

---

## Prerequisites | پیش‌نیازها

- Node.js (v14 or higher | نسخه 14 یا بالاتر)
- npm (v6 or higher | نسخه 6 یا بالاتر)
- Angular CLI (v15 or higher | نسخه 15 یا بالاتر)

---

## Installation | نصب

### Step 1 | مرحله 1: Install all dependencies | نصب تمام وابستگی‌ها

```bash
npm run install-all
```

این دستور تمام وابستگی‌های لازم برای پروژه ریشه، بک‌اند و فرانت‌اند را نصب می‌کند.

This command installs all required dependencies for root project, backend, and frontend.

### Step 2 | مرحله 2: Start the development servers | راه‌اندازی سرورهای توسعه

```bash
npm start
```

این دستور هر دو سرور بک‌اند (پورت 3000) و فرانت‌اند (پورت 4200) را راه‌اندازی می‌کند.

This will start both the backend (on port 3000) and frontend (on port 4200) servers.

---

## Project Structure | ساختار پروژه

```
v5/
├── angular-project/    # Angular frontend application | برنامه فرانت‌اند Angular
├── backend/            # Node.js backend API | API بک‌اند Node.js
└── backend-mongo/      # MongoDB integration (optional) | یکپارچه‌سازی MongoDB (اختیاری)
```

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

> **Note | توجه:** می‌توانید از صفحه Register یا Signup یک حساب کاربری جدید ایجاد کنید.
> You can also create a new account from the Register or Signup page.

---

## API Endpoints | نقاط اتصال API

### Authentication | احراز هویت

- **POST** `/api/auth/register` - Register a new user | ثبت کاربر جدید
- **POST** `/api/auth/login` - Login user | ورود کاربر

### User Dashboard | داشبورد کاربر

- **GET** `/api/user/dashboard` - Get user dashboard data | دریافت اطلاعات داشبورد کاربر

### Admin Dashboard | داشبورد مدیر

- **GET** `/api/admin/dashboard` - Get admin dashboard data | دریافت اطلاعات داشبورد مدیر

---

## Development | توسعه

### Run Backend Only | فقط اجرای بک‌اند:

```bash
npm run backend
```

### Run Frontend Only | فقط اجرای فرانت‌اند:

```bash
npm run frontend
```

---

## Features | ویژگی‌ها

### Frontend | فرانت‌اند:
- ✅ Angular 17
- ✅ Material Design (Angular Material)
- ✅ Tailwind CSS
- ✅ Responsive Design | طراحی واکنش‌گرا
- ✅ Authentication Guards | محافظ احراز هویت
- ✅ HTTP Interceptors | اینترسپتور HTTP
- ✅ User Dashboard | داشبورد کاربر
- ✅ Admin Dashboard | داشبورد مدیر

### Backend | بک‌اند:
- ✅ Node.js & Express
- ✅ JWT Authentication | احراز هویت JWT
- ✅ bcrypt Password Hashing | هش کردن رمز عبور با bcrypt
- ✅ RESTful API
- ✅ CORS Enabled | فعال‌سازی CORS

---

## Technologies Used | تکنولوژی‌های استفاده شده

### Frontend | فرانت‌اند:
- Angular 17.3.0
- Angular Material 17.3.10
- Tailwind CSS 3.4.17
- RxJS 7.8.0
- TypeScript 5.4.2

### Backend | بک‌اند:
- Node.js
- Express.js 4.18.2
- JSON Web Token (JWT) 9.0.2
- bcrypt 5.1.1
- CORS 2.8.5

---

## Troubleshooting | عیب‌یابی

### Problem: Cannot find module errors | خطا: ماژول یافت نشد

**Solution | راه‌حل:**
```bash
cd backend
npm install
cd ../angular-project
npm install
```

### Problem: Port already in use | خطا: پورت در حال استفاده است

**Solution | راه‌حل:**
- Backend: Change port in `backend/app.js`
- Frontend: Use `ng serve --port 4201`

---

## License | مجوز

This project is open source | این پروژه متن‌باز است.

---

## Contact | تماس

For questions or issues, please open an issue on GitHub.

برای سوالات یا مشکلات، لطفاً یک issue در GitHub ایجاد کنید.

---
