
import authModel from '../../models/authModel.js';
import argon2 from 'argon2';

const updatePassword = async (req, res) => {
    try{
        const userEmail = req.session.email;
        const newPassword = req.body.password;

        if (!newPassword) {
             return res.status(400).send({ message: 'Please provide a new password' });
         }           
        const existingUser = await authModel.findOne({ email: userEmail });

        if(existingUser){
           const hashedPassword = await argon2.hash(newPassword);         
           existingUser.password = hashedPassword;
           await existingUser.save();
           // Step 6: Clear the OTP from session (optional, for security reasons)
           delete req.session.email;  // Clear the email after password update

           return res.status(200).send({ message: 'Password updated successfully' });

        }else{
            res.status(404).send({ message: 'email is not valid '});
        }
    
    }catch(err){
        res.status(500).send({ error: err})
        console.log('forgetPassword error', err);
    }
} 

export default updatePassword;




