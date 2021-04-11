const Class = require('../models/class');
const APPECTATION = require('../config/constants');
const cluster = require('cluster');

const ClassMethod = new Class();

const saveClass = async(req,res)=>{
try {

    let classDetails ={name:req.body.name,code:req.body.code}
    let checkingClass = await ClassMethod.findClassDetails(classDetails);
    if(checkingClass) throw {success:false,msg:APPECTATION.STATUSMESSAGE.CLASS_ALREDY_EXIST}
    
    let classDetailsObject = new Class({name:req.body.name,code:req.body.code,countryId:req.body.countryId})
    let saveClasss = await classDetailsObject.save();
    res.json({success:true,msg:saveClasss})
    cluster.worker.kill();
} catch (error) {
   res.json(error) 
}
}
module.exports ={saveClass}