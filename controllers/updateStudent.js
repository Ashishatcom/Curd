const STUDENT = require('../models/student');
const APPECTATION = require('../config/constants');
const cluster = require('cluster');
const STUDENTMethod = new STUDENT();

const updateSingleStudent = async(req,res)=>{
try {
    let checkingStudent = await STUDENTMethod.findSingleDetails(req.params.id);

    if(!checkingStudent) throw {success:false,msg:APPECTATION.STATUSMESSAGE.STUDENT_NOT_FOUND}
    
    checkingStudent.name=req.body.name,
    checkingStudent.code=req.body.code
    let updateSaveStudent = await checkingStudent.save();
    res.json({success:true,msg:updateSaveStudent})
    cluster.worker.kill();
    
} catch (error) {
   res.json(error) 
}
}
module.exports ={updateSingleStudent}