const Student = require('../models/student');
const APPECTATION = require('../config/constants');
const cluster = require('cluster');
const StudentMethod = new Student();

const fetchStudent = async(req,res)=>{
try {
     
    let checkingStudent = await StudentMethod.findSingleDetails(req.params.id);
    if(!checkingStudent) throw {success:false,msg:APPECTATION.STATUSMESSAGE.STUDENT_NOT_FOUND}
    
    res.json({success:true,msg:checkingStudent})
    cluster.worker.kill();
    
} catch (error) {
   res.json(error) 
}
}
module.exports ={fetchStudent}