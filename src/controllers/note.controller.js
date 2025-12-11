import Note from '../models/note.model.js';

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content required" });
    }

    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized (no user)" });

    const note = await Note.create({ title, content, owner: userId });
    return res.status(201).json({ message: "Note created successfully", note });
  } catch (error) {
    console.error("❗ createNote error:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getAllNotes = async (req, res) => {
    try {
        const userId = req.user?.id; // get user id from auth middleware
        if (!userId) return res.status(401).json({message: "Unauthorized (no user)"});
        const notes = await Note.find({owner: userId});
        res.status(200).json({notes});

        
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
};

export const getNoteById = async (req, res) => {
    try {
        const noteId = req.params.id; // get note id from params
        const note = await Note.findById(noteId); // find note by id
        if (!note) {
            return  res.status(404).json({message: "Note not found"});
        }
        if(note.owner.toString() !== req.user.id) {
            return res.status(403).json({message: "Forbidden: You don't have access to this note"});
        }
        res.status(200).json({note});
    } catch (error) {
        res.status(500).json({message: "Can't get note by id", error: error.message});
    }
};

export const updateNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const {title, content} = req.body;
        const note = await Note.findById(noteId);
        if(!note) {
            return res.status(404).json({message: "Note not found"});
        }
        if(note.owner.toString() !== req.user.id) {
            return res.status(403).json({message: "Forbidden: You don't have access to update this note"});
        }
        note.title = title || note.title;
        note.content = content || note.content;
        await note.save();
        res.status(200).json({message: "Note updated successfully", note});


    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
};

export const deleteNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const note = await Note.findById(noteId);
        if(!note) {
            return res.status(404).json({message: "Note not found"});
        }
        if(note.owner.toString() !== req.user.id) {
            return res.status(403).json({message: "Forbidden: You don't have access to delete this note"});
        }
        await Note.findByIdAndDelete(noteId);
        res.status(200).json({message: "Note deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
};