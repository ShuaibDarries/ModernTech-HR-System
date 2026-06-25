# ModernTech Solutions - HR Management System

## Project Description

This is a proof-of-concept HR web application built for ModernTech Solutions, a software development company with 250 employees. The application centralises employee data management, payroll calculations, time off requests, and attendance tracking into a single responsive client-side application.

## Technologies Used

- **Vue.js 3** - Progressive JavaScript framework for building the user interface
- **Bootstrap 5** - CSS framework for responsive design and UI components
- **Vite** - Build tool for fast development and optimised production builds
- **HTML5 / CSS3** - Semantic markup and styling
- **localStorage** - Client-side data persistence

## Key Features

- **Mock Authentication System** - Login with hardcoded credentials (admin / admin123)
- **Employee Data Management** - View, search, filter, add, edit, and delete employee records (17 dummy employees included)
- **Payroll Calculations** - Automated monthly payroll with overtime, bonus, and deductions; digital payslip generation
- **Time Off Requests** - Submit leave requests with type, start/end dates; approve or deny requests
- **Attendance Tracking** - View attendance records with status badges (Present, Absent, Late)
- **Dashboard** - Visual summary cards and department breakdown with progress bars
- **Responsive Design** - Fully responsive interface using Bootstrap grid system for mobile, tablet, and desktop
- **Client-Side Data Persistence** - All data stored in localStorage so changes persist across sessions
- **Form Validation** - Client-side validation on login, employee forms, and time off requests

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) installed (version 16 or higher)
- npm (comes with Node.js)

### Installation

1. Extract the project files to a folder.
2. Open a terminal in the project folder.
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the URL shown in your terminal (usually `http://localhost:3000`) in your browser.

### Build for Production

```bash
npm run build
```

## Demo Credentials

- **Username:** `admin`
- **Password:** `admin123`

## Project Structure

```
moderntech-hr-app/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── README.md
└── src/
    ├── main.js
    ├── App.vue
    ├── data/
    │   └── dummyData.js
    └── components/
        ├── LoginPage.vue
        ├── NavBar.vue
        ├── EmployeeManager.vue
        ├── PayrollManager.vue
        ├── TimeOffManager.vue
        └── Dashboard.vue
```

## Notes

- All data is stored in the browser's localStorage. Clear localStorage if you want to reset to the original dummy data.
- The application runs entirely on the client side with no backend server required.
- The payslip can be printed directly from the browser.
