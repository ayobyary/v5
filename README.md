# V5 Project - Full Stack Application

A full-stack application with Angular frontend and Node.js backend.

---

# پروژه V5 - برنامه فول‌استک

یک برنامه فول‌استک با فرانت‌اند Angular و بک‌اند Node.js.

---

## Project Structure | ساختار پروژه

This is a monorepo containing two independent projects:

این یک monorepo است که شامل دو پروژه مستقل است:

```
v5/
├── angular-project/   # Angular frontend application (independent)
└── backend/           # Node.js backend API (independent)
```

---

## Quick Start | شروع سریع

### Option 1: Run Both Together | گزینه 1: اجرای هر دو با هم

From the root directory:

از پوشه ریشه:

```bash
npm run install-all    # Install all dependencies
npm start              # Start both servers
```

### Option 2: Run Independently | گزینه 2: اجرای مستقل

#### Backend | بک‌اند:

```bash
cd backend
npm install
npm run dev
```

Server will run on: `http://localhost:3000`

#### Frontend | فرانت‌اند:

```bash
cd angular-project
npm install
npm start
```

Application will run on: `http://localhost:4200`

---

## Prerequisites | پیش‌نیازها

- Node.js (v14 or higher | نسخه 14 یا بالاتر)
- npm (v6 or higher | نسخه 6 یا بالاتر)
- Angular CLI (v15 or higher | نسخه 15 یا بالاتر) - Only for frontend

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

## Documentation | مستندات

Each project has its own README:

هر پروژه README مخصوص خودش را دارد:

- **[Backend README](./backend/README.md)** - Backend API documentation | مستندات API بک‌اند
- **[Frontend README](./angular-project/README.md)** - Frontend application documentation | مستندات برنامه فرانت‌اند

---

## API Endpoints | نقاط اتصال API

Base URL: `http://localhost:3000/api`

### Authentication | احراز هویت
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### User Dashboard | داشبورد کاربر
- GET `/api/user/dashboard` - Get user dashboard data

### Admin Dashboard | داشبورد مدیر
- GET `/api/admin/dashboard` - Get admin dashboard data

---

## Development | توسعه

### Backend Development | توسعه بک‌اند:

```bash
cd backend
npm run dev
```

### Frontend Development | توسعه فرانت‌اند:

```bash
cd angular-project
npm start
```

---

## Technologies | تکنولوژی‌ها

### Backend | بک‌اند:
- Node.js
- Express.js
- JWT Authentication
- bcrypt

### Frontend | فرانت‌اند:
- Angular 17
- Angular Material
- Tailwind CSS
- TypeScript

---

## License | مجوز

This project is open source | این پروژه متن‌باز است.

---
