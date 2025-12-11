import {Schema} from 'mongoose';
import mongoose from 'mongoose';

const noteSchema  =new Schema({
    title:
    {
        type: String,
        required: true
    },
    content:
    {
        type: String
    },
    owner:
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

const Note = mongoose.model('Note', noteSchema);

export default Note;