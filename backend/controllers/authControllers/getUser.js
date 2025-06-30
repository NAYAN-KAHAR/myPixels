
import authModel from '../../models/authModel.js';

const getUser = async (req, res) => {
    try{
        const users = await authModel.find();
        res.status(200).send(users);   
    }catch(err){
        res.status(500).send({error:err}) 
    }
}


export default getUser;