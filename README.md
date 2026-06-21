# CyberGuard - Password Security Toolkit

This is a Flask-based password security toolkit project. It is built as a student web application to demonstrate password strength analysis, password generation, offline breach checking, and password storage using local encryption.

## Features
- Register and Login
- Dashboard showing total credentials, average strength, and activity log
- Password Strength Analyzer (live checker and server-side analysis)
- Custom Password Generator (choose length, numbers, letters, symbols)
- Offline Password Breach Checker (checks against a dictionary list of 1,000 common passwords)
- Credentials Vault (secure storage using AES Fernet encryption)
- Activity Audit Log (tracks logins, additions, and deletions)
- Report Export (download reports as PDF or CSV)

## Installation & Setup

1. Create a Python virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

2. Install the required python packages:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the Flask application:
   ```bash
   python app.py
   ```
   Open your browser and visit: `http://127.0.0.1:5000`

## Project Structure
- `app.py`: Main Flask application containing all routes, db models, and security logic.
- `requirements.txt`: Python package dependencies.
- `static/`: Frontend assets (custom CSS, JavaScript logic, and common passwords dictionary list).
- `templates/`: Jinja2 HTML templates for each page.
- `docs/`: Weekly project reports.
