
import otpModel from '../../models/otpModel.js';

const verifyOtp = async (req, res) => {
    try{
        const userOtp = req.body.newOtp;
        const storedEmail = req.session.email;

        if (!storedEmail) {
            return res.status(400).send({ message: "Email not found in session." });
        }

        const otpRecord = await otpModel.findOne({ email: storedEmail});

        if(otpRecord.otp !== userOtp){
            console.log('otpRecord', otpRecord);
            return res.send({ message: "OTP not valid." });
        }
        if(otpRecord){
            if(otpRecord.expiresAt <  Date.now()){
                return res.send({ message: "OTP has expired." });
            }else{
                await otpModel.deleteOne({ email: storedEmail });
                res.status(200).send({ message: "OTP verified successfully." });
               
            }
        }else{
            return res.status(404).send({ message: "No OTP found for this email."})
        }
    
    }catch(err){
        res.status(500).send({ error: err})
        console.log('forgetPassword error', err);
    }
} 

export default verifyOtp;

	