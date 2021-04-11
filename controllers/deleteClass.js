const Class = require('../models/class');
const APPECTATION = require('../config/constants');
const cluster = require('cluster');
const deleteSingleClass = async(req,res)=>{
try {
    let deleteClass = await Class.remove({_id:req.params.id});
    if(!deleteClass) throw {success:false,msg:APPECTATION.STATUSMESSAGE.CLASS_NOT_FOUND}
    
    res.json({success:true,msg:deleteClass})
    cluster.worker.kill();
} catch (error) {
   res.json(error) 
}
}
module.exports ={deleteSingleClass}