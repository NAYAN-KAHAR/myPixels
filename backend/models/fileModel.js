
import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    fileUrl: { 
         type: String,
         required: true
    },
  
    fileType: { 
        type: String, 
         enum: ['image', 'video'],
         required: true
     },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });


const fileModel = mongoose.model('image', fileSchema);

export default fileModel;
