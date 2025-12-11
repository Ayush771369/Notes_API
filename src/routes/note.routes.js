import auth from '../middlewares/auth.middleware.js';
import express from 'express';
import { createNote, getNoteById, getAllNotes, updateNote, deleteNote} from '../controllers/note.controller.js';


const router = express.Router();

router.post('/', auth, createNote);

router.get('/', auth, getAllNotes);

router.get('/:id', auth, getNoteById);

router.put('/:id', auth, updateNote);

router.delete('/:id', auth, deleteNote);



export default router;