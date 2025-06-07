# V5 Project

A full-stack application with Angular frontend and Node.js backend.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Angular CLI (v15 or higher)

## Installation

1. Install all dependencies:
```bash
npm run install-all
```

2. Start the development servers:
```bash
npm start
```

This will start both the backend (on port 3000) and frontend (on port 4200) servers.

## Project Structure

- `/angular-project` - Angular frontend application
- `/backend` - Node.js backend API
- `/backend-mongo` - MongoDB integration (optional)

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### User Dashboard
- GET `/api/user/dashboard` - Get user dashboard data

### Admin Dashboard
- GET `/api/admin/dashboard` - Get admin dashboard data

## Development

- Backend: `npm run backend`
- Frontend: `npm run frontend`

---