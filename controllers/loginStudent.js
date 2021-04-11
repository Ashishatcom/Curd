const Student = require('../models/student');
const APPECTATION = require('../config/constants');
const cluster = require('cluster');
const StudentMethod = new Student();
// require('dotenv').config(); 
const jwt = require('jsonwebtoken');


const loginStudent = async (req,res)=>{

    try {
         let loginDetails = {code:req.body.code,username:req.body.username,password:req.body.password}

         let userDetailsInDatabase = await StudentMethod.findStudentDetails(loginDetails);
         console.log({fromFunction:userDetailsInDatabase});
         if(!userDetailsInDatabase) throw new Error(APPECTATION.STATUSMESSAGE.NOT_FOUND);

         let comparedPassword =  await StudentMethod.isPasswordMatch(loginDetails,userDetailsInDatabase);
         if(!comparedPassword)  throw new Error(APPECTATION.STATUSMESSAGE.PASSWORD_NOT_MATCH);
         // Creating  Token
         let token = jwt.sign({code:userDetailsInDatabase.code,userId:userDetailsInDatabase._id,
            Status : true,username:userDetailsInDatabase.username
        },APPECTATION.ENVIROMENT.JWT_SECRET,{ expiresIn: APPECTATION.ENVIROMENT.JWT_EXPIRE});

        // Refresh Token
        let refreshToken = jwt.sign({code:userDetailsInDatabase.code,userId:userDetailsInDatabase._id,
            Status : true,username:userDetailsInDatabase.username
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
	loginStudent,
}