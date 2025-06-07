const bcrypt = require('bcrypt');

// رمزهای عبور اصلی: user123, user223, admin123
const users = [
  { 
    id: 1, 
    email: 'user1@example.com', 
    passwordHash: '$2b$10$3Ky0HXxXxXxXxXxXxXxXeXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx', 
    role: 'user' 
  },
  { 
    id: 2, 
    email: 'user2@example.com', 
    passwordHash: '$2b$10$3Ky0HXxXxXxXxXxXxXxXeXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx', 
    role: 'user' 
  },
  { 
    id: 3, 
    email: 'admin@example.com', 
    passwordHash: '$2b$10$3Ky0HXxXxXxXxXxXxXxXeXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx', 
    role: 'admin' 
  }
];

// تابع برای ایجاد رمز عبور هش شده
async function createHashedPassword(password) {
  return await bcrypt.hash(password, 10);
}

// به‌روزرسانی رمزهای عبور
async function updatePasswords() {
  users[0].passwordHash = await createHashedPassword('user123');
  users[1].passwordHash = await createHashedPassword('user223');
  users[2].passwordHash = await createHashedPassword('admin123');
}

// اجرای به‌روزرسانی رمزهای عبور
updatePasswords().catch(console.error);

module.exports = users; 