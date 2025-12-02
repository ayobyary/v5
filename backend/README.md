# Backend API

Node.js backend API with Express and JWT authentication.

---

# API بک‌اند

API بک‌اند Node.js با Express و احراز هویت JWT.

---

## Prerequisites | پیش‌نیازها

- Node.js (v14 or higher | نسخه 14 یا بالاتر)
- npm (v6 or higher | نسخه 6 یا بالاتر)

---

## Installation | نصب

```bash
npm install
```

---

## Configuration | پیکربندی

### Environment Variables | متغیرهای محیطی

You can configure the server using environment variables:

می‌توانید سرور را با استفاده از متغیرهای محیطی پیکربندی کنید:

- `PORT` - Server port (default: 3000) | پورت سرور (پیش‌فرض: 3000)
- `JWT_SECRET` - JWT secret key (default: 'SECRET_KEY') | کلید مخفی JWT (پیش‌فرض: 'SECRET_KEY')

---

## Running the Server | اجرای سرور

### Development Mode | حالت توسعه:

```bash
npm run dev
```

This will start the server with nodemon (auto-reload on file changes).

این دستور سرور را با nodemon راه‌اندازی می‌کند (بازبارگذاری خودکار در صورت تغییر فایل‌ها).

### Production Mode | حالت تولید:

```bash
npm start
```

---

## Default Port | پورت پیش‌فرض

The server runs on port **3000** by default.

سرور به صورت پیش‌فرض روی پورت **3000** اجرا می‌شود.

---

## API Endpoints | نقاط اتصال API

### Base URL | آدرس پایه:
```
http://localhost:3000/api
```

### Authentication | احراز هویت

#### Register | ثبت‌نام
- **POST** `/api/auth/register`
- **Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "user",
  "phone": "1234567890"
}
```

#### Login | ورود
- **POST** `/api/auth/login`
- **Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "token": "jwt_token_here",
  "role": "user",
  "email": "user@example.com"
}
```

### User Dashboard | داشبورد کاربر
- **GET** `/api/user/dashboard`
- **Headers:** `Authorization: Bearer <token>`

### Admin Dashboard | داشبورد مدیر
- **GET** `/api/admin/dashboard`
- **Headers:** `Authorization: Bearer <token>`

---

## Default Users | کاربران پیش‌فرض

### Admin | مدیر:
- **Email:** `admin@example.com`
- **Password:** `admin123`

### Users | کاربران:
- **User 1:**
  - Email: `user1@example.com`
  - Password: `user123`

- **User 2:**
  - Email: `user2@example.com`
  - Password: `user223`

---

## Project Structure | ساختار پروژه

```
backend/
├── app.js                 # Main server file | فایل اصلی سرور
├── package.json           # Dependencies | وابستگی‌ها
├── models/
│   └── user.js           # User model | مدل کاربر
├── routes/
│   ├── auth.js           # Authentication routes | مسیرهای احراز هویت
│   ├── user.js           # User routes | مسیرهای کاربر
│   └── admin.js          # Admin routes | مسیرهای مدیر
└── middleware/
    └── auth.js           # Authentication middleware | میدلور احراز هویت
```

---

## Technologies Used | تکنولوژی‌های استفاده شده

- **Node.js** - Runtime environment
- **Express.js** 4.18.2 - Web framework
- **JSON Web Token (JWT)** 9.0.2 - Authentication
- **bcrypt** 5.1.1 - Password hashing
- **CORS** 2.8.5 - Cross-Origin Resource Sharing
- **nodemon** 3.0.3 - Development auto-reload

---

## Security Features | ویژگی‌های امنیتی

- ✅ Password hashing with bcrypt | هش کردن رمز عبور با bcrypt
- ✅ JWT token authentication | احراز هویت با توکن JWT
- ✅ CORS enabled | فعال‌سازی CORS
- ✅ Input validation | اعتبارسنجی ورودی

---

## Error Handling | مدیریت خطا

All errors return JSON responses in the following format:

همه خطاها پاسخ JSON در فرمت زیر برمی‌گردانند:

```json
{
  "message": "Error message here"
}
```

---

## License | مجوز

This project is open source | این پروژه متن‌باز است.

---

