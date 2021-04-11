const Student = require('../models/student');
const APPECTATION = require('../config/constants');
const cluster = require('cluster');

const deleteSingleStudent = async(req,res)=>{
try {
    let deleteStudent = await Student.remove({_id:req.params.id});

    if(!deleteStudent) throw {success:false,msg:APPECTATION.STATUSMESSAGE.STUDENT_NOT_FOUND}
    
    res.json({success:true,msg:deleteStudent})
    cluster.worker.kill();
} catch (error) {
   res.json(error) 
}
}
module.exports ={deleteSingleStudent}