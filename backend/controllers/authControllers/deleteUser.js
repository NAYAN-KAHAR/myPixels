
import authModel from '../../models/authModel.js';

const deleteUser = async (req, res) => {
    try{
        await authModel.findByIdAndDelete(req.params.id);
        res.status(200).send({messgae:"user deleted successfully"});   
    }catch(err){
        res.status(500).send({error:err}) 
    }
}


export default deleteUser;