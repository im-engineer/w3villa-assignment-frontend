# Task Manager Frontend

This is the frontend application for a Task Manager built with React and Vite. It provides a user-friendly interface for managing tasks, including user authentication, task creation, editing, and deletion.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Environment Variables](#environment-variables)
- [License](#license)

## Features

- User registration and login
- Create, read, update, and delete tasks
- Responsive design for mobile and desktop
- User-friendly interface with Material-UI
- Toast notifications for user feedback

## Technologies Used

- React
- Vite
- Material-UI
- Axios for API requests
- Formik and Yup for form handling and validation
- React Router for navigation
- React Toastify for notifications

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```plaintext
   VITE_API_URL=http://localhost:5050
   ```

## Usage

To start the development server, run:
   ```
   npm run dev
   ```

The application will be available at `http://localhost:3000` by default.

## API Integration

This frontend application communicates with the backend API for user authentication and task management. Ensure that the backend server is running and accessible at the specified `VITE_API_URL`.

### API Endpoints

- **POST** `/auth/register` - Register a new user
- **POST** `/auth/login` - Log in an existing user
- **GET** `/tasks` - Get all tasks for the authenticated user
- **POST** `/tasks` - Create a new task
- **PUT** `/tasks/:id` - Update an existing task
- **DELETE** `/tasks/:id` - Delete a task
- **GET** `/users/me` - Get the authenticated user's details
- **PUT** `/users/me` - Update the authenticated user's details

## Environment Variables

Make sure to set the following environment variables in your `.env` file:

- `VITE_API_URL`: The base URL for your backend API.