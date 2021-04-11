const Student = require('../models/student');
const APPECTATION = require('../config/constants');
const cluster = require('cluster');
const { v4: uuidv4 } = require('uuid');
const StudentMethod = new Student();

// process.env.UV_THREADPOOL_SIZE = 6;
const saveStudent = async (req,res)=>{
    try {
        // Checking If Student Exist 
        let existingStudent = await Student.findOne({$or:[{code:req.body.code},{name:req.body.name},{username:req.body.username}]})
        if(existingStudent) throw{success:false,msg:APPECTATION.STATUSMESSAGE.USERNAME_EXIST};
        // Hashing PAssword 
        let hashedPassword = await StudentMethod.userHashingPassword(req.body.password);

        let userFormDetails = await new Student({name:req.body.name,code:req.body.code,username:req.body.username,classId:req.body.classId,password:hashedPassword});
        let saveStudentRegistration = await userFormDetails.save();

        if(!saveStudentRegistration) throw {success:false,msg:APPECTATION.STATUSMESSAGE.DATA_NOT_SAVE};
        res.json({Status:201,"msg":saveStudentRegistration})
       cluster.worker.kill();
        
    } catch (error) {
        res.json({sucess:false,msg: error.message});
    }
  
}
module.exports = {
	saveStudent,
}