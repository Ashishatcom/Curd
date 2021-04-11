const Class = require('../models/class');
const APPECTATION = require('../config/constants');
const cluster = require('cluster');
const ClassMethod = new Class();

const updateSingleClass = async(req,res)=>{
try {
    let checkingClass = await ClassMethod.findSingleDetails(req.params.id);
    if(!checkingClass) throw {success:false,msg:APPECTATION.STATUSMESSAGE.CLASS_NOT_FOUND}
    
    checkingClass.name=req.body.name,
    checkingClass.code=req.body.code
    let updateSaveClass = await checkingClass.save();
    
    res.json({success:true,msg:updateSaveClass})
    cluster.worker.kill();
    
} catch (error) {
   res.json(error) 
}
}
module.exports ={updateSingleClass}