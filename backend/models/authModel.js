

import mongoose from 'mongoose';

const authSchema =  new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    }
});

const authModel = mongoose.model('User', authSchema);

export default authModel;