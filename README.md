# Iranian Fitness Platform

A fitness platform where users can sign up, browse fitness classes or personal training sessions led by Iranian instructors, book sessions, and access content either live or pre-recorded. The platform offers a culturally relevant experience with Persian (Farsi) language support, workouts tailored to local preferences, and content that resonates with Iranian users.

<div dir="rtl" lang="fa">

## توضیحات به زبان فارسی

پلتفرم تناسب اندام «پرشین پالس» یک پلتفرم جامع است که در آن کاربران می‌توانند ثبت نام کنند، کلاس‌های تناسب اندام یا جلسات تمرین شخصی با مربیان ایرانی را مرور کنند، جلسات را رزرو کنند و به محتوا به صورت زنده یا پیش‌ضبط شده دسترسی داشته باشند.

این پلتفرم یک تجربه فرهنگی مرتبط با پشتیبانی از زبان فارسی، تمرینات متناسب با ترجیحات محلی و محتوایی که با کاربران ایرانی هم‌خوانی دارد، ارائه می‌دهد.

### ویژگی‌های اصلی:
- ثبت نام و پروفایل کاربران
- پروفایل‌های اختصاصی مربیان
- مدیریت کلاس‌های تناسب اندام
- پشتیبانی از کلاس‌های زنده و پیش‌ضبط شده
- سیستم رزرو بر اساس تقویم
- جستجو و فیلتر کلاس‌ها بر اساس دسته‌بندی‌ها، سطوح دشواری یا مربیان
- احراز هویت و دسترسی کاربران

</div>

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [API Documentation](#api-documentation)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Logs](#logs)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Registration and Profiles**: Users can sign up, log in, and manage their profiles
- **Instructor Profiles**: Instructors have unique profiles highlighting expertise, experience, and user reviews
- **Class Management**: Create, manage, and book fitness classes
- **Class Types**: Support for both live and pre-recorded classes
- **Booking System**: Calendar-based class booking system
- **Search & Filter**: Find classes by categories, difficulty levels, or instructors
- **Authentication & Authorization**: Secure role-based access control

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Documentation**: Swagger/OpenAPI
- **Logging**: Winston & Morgan
- **Cloud Hosting**: [To be determined]

## API Documentation

API documentation is available via Swagger UI at `/api-docs` endpoint when the server is running.

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/fitness-platform.git
   cd fitness-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Modify the values as needed

4. Start the server:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

### Environment Variables

| Variable Name | Description | Default |
|---------------|-------------|---------|
| NODE_ENV | Environment (development/production) | development |
| PORT | Server port | 5000 |
| MONGO_URI | MongoDB connection string | mongodb://localhost:27017/fitness-platform |
| JWT_SECRET | Secret key for JWT | - |
| JWT_EXPIRE | JWT expiration period | 30d |
| JWT_COOKIE_EXPIRE | JWT cookie expiration (days) | 30 |

## API Endpoints

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Instructors

- `GET /api/instructors` - Get all instructors
- `GET /api/instructors/:id` - Get instructor by ID
- `POST /api/instructors` - Create new instructor profile
- `PUT /api/instructors/:id` - Update instructor profile
- `DELETE /api/instructors/:id` - Delete instructor profile

### Classes

- `GET /api/classes` - Get all classes (with filters)
- `GET /api/classes/:id` - Get class by ID
- `POST /api/classes` - Create new class
- `PUT /api/classes/:id` - Update class
- `DELETE /api/classes/:id` - Delete class
- `POST /api/classes/:id/enroll` - Enroll user in class

## Project Structure

```
fitness-platform/
│
├── src/                  # Source files
│   ├── config/           # Configuration settings
│   ├── controllers/      # Route controllers
│   ├── middlewares/      # Custom middlewares
│   ├── models/           # Mongoose models
│   └── routes/           # API routes
│
├── logs/                 # Application logs
├── .env                  # Environment variables
├── .env.example          # Example environment variables
├── .gitignore            # Git ignore file
├── package.json          # NPM package file
├── server.js             # Entry point
└── README.md             # Project documentation
```

## Logs

Application logs are stored in the `logs` directory:
- `combined.log` - All logs
- `error.log` - Error logs only

## Future Enhancements

- Frontend implementation
- Payment integration with local Iranian gateways
- Notification system
- Live streaming capabilities
- Mobile app development
- Analytics dashboard for instructors
- Reviews and rating system

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 

## Contact

Erfan Ahmadvand - +98 9109924707 