# Real Estate Management System

A production-style full-stack real estate platform built with Laravel 11, React, TypeScript, Tailwind CSS, React Router, Axios, MySQL, and Laravel Sanctum.

## Overview

This project is structured as a portfolio-ready application for browsing, searching, and managing real estate properties for rent and sale.

### Frontend

- React.js
- TypeScript
- Tailwind CSS
- React Router
- Axios

### Backend

- Laravel 11
- RESTful API architecture
- MySQL database
- Laravel Sanctum authentication

## Features

### Authentication

- User registration and login
- Logout
- Role-based access control
- Normal user and admin roles

### User Capabilities

- Browse properties
- Search and filter listings
- View property details
- Save favorites
- Contact property owners

### Admin Capabilities

- Add, update, and delete properties
- Manage users
- View dashboard statistics
- Track listings and user activity

### Property Management

- Property title, description, price, location, address
- Property type and transaction type
- Bedrooms, bathrooms, area
- Multiple property images
- Availability status

### Search and Filtering

- Search by location
- Filter by price range
- Filter by property type
- Filter by rent or sale
- Filter by bedrooms

### Dashboard

- Total properties
- Total users
- Available properties
- Sold/rented properties
- Charts for property categories and monthly registrations

### Email Notifications

- New user registration
- Contacting a property owner
- Property status updates

## Project Structure

```text
Real State Managment/
├── backend/   # Laravel 11 API
├── frontend/  # React + TypeScript app
└── README.md
```

## Backend Setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan serve
```

### Backend Environment

Configure these values in `backend/.env`:

```env
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=real_estate_management
DB_USERNAME=root
DB_PASSWORD=
MAIL_MAILER=log
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Frontend Environment

Set the API URL in `frontend/.env` if needed:

```env
VITE_API_URL=http://localhost:8000/api
```

## Demo Accounts

An admin user is seeded by default:

- Email: `admin@realestate.test`
- Password: `password`

## Notes

- The backend uses Laravel Sanctum for token-based API authentication.
- The frontend is designed as a clean, responsive, interview-ready interface.
- The app structure is ready for further expansion into full CRUD forms, upload flows, charts, and live email integrations.
