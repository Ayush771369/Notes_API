📘 Notes API — Node.js, Express, MongoDB (JWT Auth)

A secure and cleanly structured Notes Management REST API built using Node.js, Express, and MongoDB, featuring JWT authentication, user authorization, and complete CRUD operations for personal notes.

Designed as a backend-first project to showcase real-world API architecture, middleware patterns, and secure route handling.

🚀 Features
🔐 Authentication & Security

User Registration & Login

Password hashing using bcryptjs

JWT-based authentication with expiration

Protected routes using custom auth middleware

Owner-based authorization (users can only access their own notes)

📝 Notes CRUD

Create a new note

Fetch all notes for logged-in user

Fetch a single note by ID

Update an existing note

Delete a note

Clean error handling for unauthorized or forbidden access

🧱 Clean Project Structure

MVC pattern (Models, Controllers, Routes)

Reusable middleware

Environment variable support using .env + .env.example

Modular design (easy to add tags, pagination, search, soft delete)

🛠 Tech Stack
Category	Tools
Backend Runtime	Node.js
Framework	Express.js
Database	MongoDB Atlas + Mongoose
Authentication	JWT (jsonwebtoken)
Hashing	bcryptjs
Development Tools	Nodemon, Postman
📂 Folder Structure
Notes_API/
│
├── src/
│   ├── controllers/
│   │   ├── user.controller.js
│   │   └── note.controller.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Note.js
│   │
│   ├── routes/
│   │   ├── user.routes.js
│   │   └── note.routes.js
│   │
│   ├── middlewares/
│   │   └── auth.middleware.js
│   │
│   ├── app.js
│   └── index.js
│
├── package.json
├── .gitignore
├── .env.example
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/Ayush771369/Notes_API.git
cd Notes_API

2️⃣ Install dependencies
npm install

3️⃣ Create .env file

Create a .env file in the project root:

PORT=8000
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<a-strong-jwt-secret>


Refer to .env.example for required fields.

4️⃣ Start the development server
npm run dev


If everything is correct, you should see:

Connected to MongoDB
Server is running on port 8000

🔐 Authentication (JWT)

The login route returns a JWT token.
All protected routes require the following header:

Authorization: Bearer <your-jwt-token>


If the token is missing or invalid → 401 Unauthorized.

📡 API Endpoints
👤 User Routes
Register

POST /api/users/register

Body:

{
  "username": "ayush",
  "email": "ayush@example.com",
  "password": "secret123"
}

Login

POST /api/users/login

Body:

{
  "email": "ayush@example.com",
  "password": "secret123"
}


Response:

{
  "message": "Login successful",
  "token": "<jwt-token>"
}

📝 Notes Routes (Protected)

You MUST send: Authorization: Bearer <token>

Create Note

POST /api/notes

Body:

{
  "title": "My first note",
  "content": "Learning backend is fun!"
}

Get All Notes

GET /api/notes

Response Example:

{
  "notes": [
    {
      "_id": "...",
      "title": "...",
      "content": "...",
      "owner": "...",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}

Get Note by ID

GET /api/notes/:id

Update Note

PUT /api/notes/:id

Body: (any one or both fields)

{
  "title": "Updated title",
  "content": "Updated content"
}

Delete Note

DELETE /api/notes/:id

Response:

{
  "message": "Note deleted successfully"
}

🧪 Postman Collection

The repo includes Postman Collection & Environment inside the docs/ folder.

Files:

docs/postman_collection.json
docs/postman_environment.json


Import these into Postman to test the API easily.

Environment variables include:

{{BASE_URL}}

{{TOKEN}}

{{NOTE_ID}}

🚨 Error Handling

This API returns consistent JSON error responses.

Status Code	Meaning
400	Bad Request
401	Unauthorized (missing/invalid token)
403	Forbidden (accessing someone else's note)
404	Not Found
500	Server Error
🔒 Security Practices

Password hashing with bcrypt

JWT authentication with expiration

Protected routes through middleware

Owner-based authorization

Secrets stored in .env (never committed)

.env ignored in .gitignore

➕ Future Enhancements

Pagination for notes

Search and filters

Tags support

Soft delete (deletedAt)

Rate limiting (DDOS protection)

Deployment on Render / Railway

Multi-tenant architecture version

👨‍💻 Author

Ayush Varun
Backend Developer • AI/ML Enthusiast
GitHub: Ayush771369

LinkedIn: (Add your link here)

📝 License

MIT License
