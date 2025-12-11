# 📝 Notes API

A comprehensive RESTful API for managing personal notes with robust authentication and authorization. Built with modern Node.js practices, this API provides a secure backend solution for note-taking applications.



---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)

- [Security Features](#security-features)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 Overview

The Notes API is a secure, scalable backend service that enables users to create and manage personal notes. With JWT-based authentication and role-based access control, users can only access and modify their own notes, ensuring data privacy and security.

### Key Highlights

- **Secure Authentication**: Industry-standard JWT tokens with bcrypt password hashing
- **RESTful Design**: Clean, intuitive API endpoints following REST principles
- **Owner-Based Access**: Users can only view and modify their own notes
- **Scalable Architecture**: Modular controller-based structure for easy maintenance
- **Production Ready**: Comprehensive error handling and input validation

---

## 🚀 Features

### Authentication & Authorization
- ✅ User registration with email validation
- ✅ Secure login with JWT token generation
- ✅ Password hashing using bcrypt (10 salt rounds)
- ✅ Protected routes with middleware authentication
- ✅ Token expiration and refresh mechanisms

### Notes Management
- ✅ **Create** new notes with title and content
- ✅ **Read** all user notes or specific note by ID
- ✅ **Update** existing notes (title, content, status)
- ✅ **Delete** notes permanently
- ✅ Ownership verification on all operations
- ✅ Timestamp tracking (createdAt, updatedAt)

### Additional Features
- ✅ Input validation and sanitization
- ✅ Comprehensive error handling
- ✅ RESTful API design
- ✅ Clean code architecture with controllers
- ✅ MongoDB indexing for optimized queries
- ✅ CORS support for frontend integration

---

## 🛠 Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime environment | v14+ |
| **Express.js** | Web framework | v4+ |
| **MongoDB** | NoSQL database | v4+ |
| **Mongoose** | ODM for MongoDB | Latest |
| **JWT** | Authentication tokens | Latest |
| **bcrypt.js** | Password hashing | Latest |
| **dotenv** | Environment variables | Latest |
| **express-validator** | Input validation | Latest |

---

## 📦 Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas account)
- **Git**

### Step 1: Clone the Repository

```bash
git clone https://github.com/Ayush771369/Notes_API.git
cd Notes_API
```

### Step 2: Install Dependencies

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the following variables (see [Environment Variables](#environment-variables) section):

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
NODE_ENV=development
```

### Step 4: Start the Server

**Development mode** (with hot reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will start on `http://localhost:5000` (or your specified PORT).

---

## 🔐 Environment Variables

Create a `.env` file with the following configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/notes_db
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/notes_db

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_make_it_very_long_and_random
JWT_EXPIRE=7d

# Optional: Email Configuration (for future features)
# EMAIL_HOST=smtp.gmail.com
# EMAIL_PORT=587
# EMAIL_USER=your_email@gmail.com
# EMAIL_PASSWORD=your_app_password
```

### Environment Variable Details

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/notes_db` |
| `JWT_SECRET` | Secret key for JWT signing | Random 64-character string |
| `JWT_EXPIRE` | Token expiration time | `7d`, `24h`, `30m` |
| `NODE_ENV` | Environment mode | `development`, `production` |

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
- **POST** `/api/auth/register`
- **Body**: `{ name, email, password }`
- **Returns**: JWT token and user details

#### Login User
- **POST** `/api/auth/login`
- **Body**: `{ email, password }`
- **Returns**: JWT token and user details

---

### Notes Endpoints

**All note endpoints require authentication.** Include JWT token in headers:
```
Authorization: Bearer <your_jwt_token>
```

#### Get All Notes
- **GET** `/api/notes`
- Returns all notes belonging to the authenticated user

#### Get Note by ID
- **GET** `/api/notes/:id`
- Returns a specific note if owned by the authenticated user

#### Create New Note
- **POST** `/api/notes`
- **Body**: `{ title, content }`
- Creates a new note for the authenticated user

#### Update Note
- **PUT** `/api/notes/:id`
- **Body**: `{ title, content }` (both optional)
- Updates the specified note if owned by the authenticated user

#### Delete Note
- **DELETE** `/api/notes/:id`
- Deletes the specified note if owned by the authenticated user

---

### Common HTTP Status Codes

- **200**: Success
- **201**: Resource created successfully
- **400**: Bad request (validation errors)
- **401**: Unauthorized (invalid/missing token)
- **403**: Forbidden (not owner of resource)
- **404**: Resource not found
- **500**: Server error

---

## 📁 Project Structure

```
Notes_API/
├── config/
│   └── db.js                 # Database connection configuration
├── controllers/
│   ├── authController.js     # Authentication logic
│   └── notesController.js    # Notes CRUD operations
├── middleware/
│   ├── auth.js               # JWT authentication middleware
│   └── errorHandler.js       # Global error handler
├── models/
│   ├── User.js               # User schema
│   └── Note.js               # Note schema
├── routes/
│   ├── authRoutes.js         # Authentication routes
│   └── noteRoutes.js         # Notes routes
├── utils/
│   └── validators.js         # Input validation helpers
├── .env                      # Environment variables (not in repo)
├── .gitignore               # Git ignore file
├── server.js                # Entry point
├── package.json             # Dependencies
└── README.md                # Documentation
```

---

---

## 🔒 Security Features

### Password Security
- Passwords are hashed using **bcrypt** with 10 salt rounds
- Minimum password length requirement (6 characters recommended)
- Passwords never stored in plain text

### JWT Token Security
- Tokens are signed with a secret key
- Configurable expiration time (default: 7 days)
- Tokens must be included in Authorization header
- Middleware validates token on every protected route

### Access Control
- Users can only access their own notes
- Ownership verification on all note operations
- MongoDB ObjectId validation to prevent injection

### Input Validation
- Email format validation
- Required field checking
- Data sanitization to prevent XSS
- Request body size limits

### Best Practices
- CORS configuration for frontend integration
- Rate limiting (recommended for production)
- Environment-based configuration
- Secure HTTP headers (helmet.js recommended)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Notes_API.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

5. **Open a Pull Request**

### Coding Standards
- Follow existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation for new features
- Write tests for new functionality

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Ayush

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📧 Contact

**Ayush**
- GitHub: [@Ayush771369](https://github.com/Ayush771369)
- Project Link: [https://github.com/Ayush771369/Notes_API](https://github.com/Ayush771369/Notes_API)

---

## 🙏 Acknowledgments

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT.io](https://jwt.io/)
- [bcrypt.js](https://github.com/kelektiv/node.bcrypt.js)

---

## 📈 Future Enhancements

- [ ] Add note categories/tags
- [ ] Implement search functionality
- [ ] Add note sharing between users
- [ ] Email verification for new users
- [ ] Password reset functionality
- [ ] Rate limiting for API endpoints
- [ ] Pagination for notes list
- [ ] Note archiving feature
- [ ] Export notes to PDF/Markdown
- [ ] Two-factor authentication (2FA)

---

<p align="center">Made with ❤️ by Ayush</p>
<p align="center">⭐ Star this repo if you find it helpful!</p>
