
import mongose from 'mongoose'

const otpScheme = new mongose.Schema({
    otp:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    expiresAt:{
        type: Date,
        required: true
    },
    createdAt:{
        type: Date,
        defalut: Date.now
    }
});

const otpModel = mongose.model('Otp', otpScheme);
export default otpModel;