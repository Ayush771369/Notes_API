import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/user.routes.js';
dotenv.config();
import auth from './middlewares/auth.middleware.js';
import noteRoutes from './routes/note.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON bodies

app.use('/api/users', userRoutes); // User routes
app.use('/api/notes', noteRoutes); // Note routes


// Sample route
app.get('/',(req,res) => {
    res.send("Server is up and running");   
});

app.get('/protected', auth, (req,res) => {
    res.send(`Hello User ${req.user.id}, you have accessed a protected route!`);
})

export default app;