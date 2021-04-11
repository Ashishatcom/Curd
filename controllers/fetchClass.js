const Class = require('../models/class');
const APPECTATION = require('../config/constants');
const cluster = require('cluster');
const ClassMethod = new Class();

const fetchClass = async(req,res)=>{
try {

    // let ClassDetails ={name:req.body.name,code:req.body.code}
    let checkingClass = await ClassMethod.findAllClassDetails();
    if(!checkingClass) throw {success:false,msg:APPECTATION.STATUSMESSAGE.CLASS_NOT_FOUND}
    
    res.json({success:true,msg:checkingClass})
    cluster.worker.kill();
    
} catch (error) {
   res.json(error) 
}
}
module.exports ={fetchClass}