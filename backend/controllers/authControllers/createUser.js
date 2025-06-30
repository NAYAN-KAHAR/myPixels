
import authModel from '../../models/authModel.js';
import Joi from 'joi';
import argon2 from 'argon2';

const validateUser = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(8), 
});

const createUser = async (req, res) => {
    try{
        const existsUser = await authModel.findOne({ email: req.body.email });
        if (existsUser) {
            return res.send({ message: "User already exists, please try another email" });
        } else {
            await validateUser.validateAsync(req.body);
            const hashPassword = await argon2.hash(req.body.password);
            const users = {
                name: req.body.name,
                email: req.body.email,
                password: hashPassword
            };
            const newUser = await authModel.create(users);
            res.status(201).send({ message: "User created", newUser });
        }
    } catch (err) {
        res.status(500).send({ error: err });
        console.log(err);
    }
};

export default createUser;
