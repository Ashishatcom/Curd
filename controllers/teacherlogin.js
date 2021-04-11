const User = require('../models/teacher');
const APPECTATION = require('../config/constants');
const cluster = require('cluster');
const UserMethod = new User();
// require('dotenv').config(); 
const jwt = require('jsonwebtoken');


const loginUser = async (req,res)=>{

    try {
         let loginDetails = {code:req.body.code,password:req.body.password}

         let userDetailsInDatabase = await UserMethod.findUserDetails(loginDetails);
         if(!userDetailsInDatabase) throw new Error(APPECTATION.STATUSMESSAGE.NOT_FOUND);

         let comparedPassword =  await UserMethod.isPasswordMatch(loginDetails,userDetailsInDatabase);
         if(!comparedPassword)  throw new Error(APPECTATION.STATUSMESSAGE.PASSWORD_NOT_MATCH);
         // Creating  Token
         let token = jwt.sign({code:userDetailsInDatabase.code,userId:userDetailsInDatabase._id,
            Status : true
        },APPECTATION.ENVIROMENT.JWT_SECRET,{ expiresIn: APPECTATION.ENVIROMENT.JWT_EXPIRE});

        // Refresh Token
        let refreshToken = jwt.sign({code:userDetailsInDatabase.code,userId:userDetailsInDatabase._id,
            Status : true
        },APPECTATION.ENVIROMENT.JWT_SECRET,{ expiresIn: APPECTATION.ENVIROMENT.JWT_EXPIRE_REFRESH});
            userDetailsInDatabase.token = refreshToken
            userDetailsInDatabase.save()

         res.json({Status:200,"Response":token,"RefreshToken":refreshToken});
         cluster.worker.kill();
         
        } catch (error) {
        res.json({success:false,msg: error.message})
    }  
}
module.exports = {
	loginUser,
}