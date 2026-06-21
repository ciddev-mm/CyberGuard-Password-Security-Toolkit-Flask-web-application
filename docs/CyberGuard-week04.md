# Week 04 – System Design

## Project Title

**CyberGuard – Password Security Toolkit**

---

## System Design

The system is designed as a web application. Users can register, log in, analyze password strength, generate secure passwords, and view their password history.

The application will use Flask as the backend and SQLite as the database.

---

## User Flow

The basic user flow is:

* User Registration
* User Login
* Dashboard
* Password Analysis
* Password Generation
* View History
* Export Report
* Logout

---

## Database Design

The system will use the following tables:

### Users

* User ID
* Username
* Email
* Password

### Password History

* History ID
* User ID
* Password Score
* Scan Date

### Activity Log

* Activity ID
* User ID
* Activity
* Date and Time

---

## Interface Planning

The system will include the following pages:

* Login Page
* Register Page
* Dashboard
* Password Analyzer
* Password Generator
* Password History
* User Profile
* Activity Log

---

## Week 04 Progress

During Week 04, the system design, user flow, database structure, and page layout were prepared. These designs will be used in the development stage.
