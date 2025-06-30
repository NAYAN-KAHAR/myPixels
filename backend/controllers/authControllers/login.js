
import authModel from '../../models/authModel.js';
import Joi from 'joi';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const validateUser = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(8)
});

const loginUser = async (req, res) => {
    try{
        await validateUser.validateAsync(req.body)
        const existsUser = await authModel.findOne({ email: req.body.email });
        if (existsUser) {
            const checkPassword = await argon2.verify(existsUser.password, req.body.password,)
            if(checkPassword){
                const token = jwt.sign( { id: existsUser._id, email: req.body.email }, 
                    process.env.MY_SECRET
                );
                
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production', 
                    sameSite: 'Lax',
                    maxAge: 3600000 // 1 hour
                });
                
                res.status(200).send({message:'user login sucessfully', existsUser, token})
                console.log('Cookie Set:', req.cookies);

            }else{
                res.send({message:'incorrect password here'})
            }
        }else{
            res.send({message:"user not found"})
        } 
    } catch (err) {
        res.status(500).send({ error: err });
        console.log(err);
    }
};

export default loginUser;
