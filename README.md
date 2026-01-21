# 🎓 Student Record Management System

A modern, comprehensive web application for managing student records, attendance, and grades. Built with a focus on user experience, it features a premium "Glassmorphism" UI design, real-time data processing, and a secure backend.

![Dashboard Preview](file:///C:/Users/Manoj/OneDrive/Desktop/studentManagementSystem/student-record-system/frontend/index.html)
*(Note: Replace with actual screenshot link)*

---

## 🏗️ Architecture Overview

This project follows a clean **Client-Server Architecture**:

*   **Frontend**: Built with **HTML5, CSS3 (Vanilla), and JavaScript**. It uses a custom Glassmorphism design system for a premium look and feel. It communicates with the backend via the Fetch API.
*   **Backend**: A **Node.js** environment running **Express.js**. It serves as a RESTful API, handling all business logic, data validation, and authentication.
*   **Database**: **SQLite** is used for a serverless, zero-configuration database experience. It stores student data, admin credentials, and academic records securely.
*   **Authentication**: Secure admin access is managed using **JSON Web Tokens (JWT)**.

---

## 🚀 How It Works

### 1. Prerequisites
*   [Node.js](https://nodejs.org/) installed on your machine.

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/Manojs018/Student-Management-System.git
cd Student-Management-System
cd backend
npm install
```

### 3. Running the Application
We have provided a simple batch script for Windows users.

1.  **One-Click Start**: Double-click the `start_app.bat` file in the root directory. This will start the backend server and open the frontend in your default browser.
2.  **Manual Start**:
    *   **Backend**: Open a terminal in the `backend` folder and run `npm start`. The server will start on `http://localhost:5000`.
    *   **Frontend**: Open `frontend/index.html` in your web browser.

### 4. Usage
*   **Login**: Use the default credentials:
    *   **Username**: `admin`
    *   **Password**: `admin`
*   **Dashboard**: View total student counts and recent activities.
*   **Student Management**: Add, edit, delete, and search for students.
*   **Academic Records**: Manage marks and attendance for each student.

---

## 📸 Preview

### Login Page
A secure entry point with a modern aesthetic.
![Login Page](https://github.com/Manojs018/Student-Management-System/assets/placeholder-login.png)

### Dashboard - Desktop
The command center for managing all student data.
![Desktop Dashboard](https://github.com/Manojs018/Student-Management-System/assets/placeholder-desktop.png)

### Mobile Responsive
Fully optimized for mobile devices.
![Mobile View](https://github.com/Manojs018/Student-Management-System/assets/placeholder-mobile.png)

---

## 🔗 Live Demo / Test
*Currently, this project is designed to run locally.*
**Project URL**: [https://github.com/Manojs018/Student-Management-System](https://github.com/Manojs018/Student-Management-System)
