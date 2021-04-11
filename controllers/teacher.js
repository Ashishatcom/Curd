const User = require('../models/teacher');
const APPECTATION = require('../config/constants');
const cluster = require('cluster');
const UserMethod = new User();
const { v4: uuidv4 } = require('uuid');
// process.env.UV_THREADPOOL_SIZE = 6;
const saveUserRegistration = async (req,res)=>{
    try {
        // Checking If USER Exist 
        let existingUser = await User.findOne({$or:[{code:req.body.code},{name:req.body.name}]})
        if(existingUser) throw new Error(APPECTATION.STATUSMESSAGE.USERNAME_EXIST);
        // Hashing PAssword 
        let hashedPassword = await UserMethod.userHashingPassword(req.body.password);

        let userFormDetails = await new User({
            name:req.body.name,
            code:uuidv4(),
            password:hashedPassword
        });
        let saveUserRegistration = await userFormDetails.save();

        if(!saveUserRegistration) throw new Error(APPECTATION.STATUSMESSAGE.DATA_NOT_SAVE);
        res.json({Status:201,"msg":saveUserRegistration.code})
       cluster.worker.kill();
        
    } catch (error) {
        res.json({sucess:false,msg: error.message});
    }
  
}
module.exports = {
	saveUserRegistration,
}