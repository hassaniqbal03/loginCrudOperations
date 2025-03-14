# loginform-operations
<br>
This is my first project which is fully secured and operational
<br>
User Authentication & CRUD API with Node.js, SQL, and Joi
<br>
Overview
<br>
This project is a user authentication system with full CRUD (Create, Read, Update, Delete) operations. It uses Node.js for the backend, SQL for database management, and Joi for input validation. The system ensures secure data handling, including password encryption with Crypto.js.
<br>
Features
<br>
✅ User Registration – New users can sign up with details like name, email, and password.
<br>
✅ User Login – Secure authentication using encrypted passwords.
<br>
✅ Data Validation – All inputs are validated using Joi.
<br>
✅ CRUD Operations – Users can be created, retrieved, updated, and deleted.
<br>
✅ Password Encryption – Uses Crypto.js to securely store passwords.
<br>
Tech Stack
<br>
Backend: Node.js (Express.js)
<br>
Database: SQL (MySQL/PostgreSQL)
<br>
Validation: Joi
<br>
Encryption: Crypto.js
<br>
API Endpoints
<br>
1️⃣ User Registration
<br>
Endpoint: POST /register
<br>
Description: Registers a new user with validated input and encrypted password.
<br>
Request Body:
<br>
{
  "fname": "John",
  "lname": "Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "address": "123 Street, NY",
  "password": "Secure@123",
  "re_password": "Secure@123",
  "age": 25
}
<br>
Response:
<br>
{ "message": "User registered successfully" }
<br>
2️⃣ User Login
<br>
Endpoint: POST /login
<br>
Description: Authenticates the user using a secure password check.
<br>
Request Body:
<br>
{
  "email": "john@example.com",
  "password": "Secure@123"
}
<br>
Response:
<br>
{ "message": "Login successful", "token": "JWT-TOKEN-HERE" }
<br>
3️⃣ Get User Details
<br>
Endpoint: GET /users/:id
<br>
Description: Retrieves a user’s details by ID.
<br>
Response:
<br>
{
  "id": 1,
  "fname": "John",
  "lname": "Doe",
  "email": "john@example.com",
  "age": 25
}
<br>
4️⃣ Update User
<br>
Endpoint: PUT /users/:id
<br>
Description: Updates user information (excluding password).
<br>
Request Body (Example Update Age):
<br>
{ "age": 26 }
<br>
Response:
<br>
{ "message": "User updated successfully" }
<br>
5️⃣ Delete User
<br>
Endpoint: DELETE /users/:id
<br>
Description: Deletes a user by ID.
<br>
Response:
<br>
{ "message": "User deleted successfully" }
<br>
Security & Validation
<br>
✔ Joi Validation: Ensures data integrity (e.g., email format, password complexity).
<br>
✔ Password Encryption: Uses Crypto.js for secure password storage.
<br>
✔ Error Handling: Handles invalid inputs and unauthorized access properly.






