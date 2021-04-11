const State = require('../models/state');
const APPECTATION = require('../config/constants');
const cluster = require('cluster');
const StateMethod = new State();

const updateSingleState = async(req,res)=>{
try {
    let checkingState = await StateMethod.findSingleDetails(req.params.id);

    if(!checkingState) throw {success:false,msg:APPECTATION.STATUSMESSAGE.STATE_NOT_FOUND}
    
    checkingState.name=req.body.name,
    checkingState.code=req.body.code
    let updateSaveState = await checkingState.save();
    res.json({success:true,msg:updateSaveState})
    cluster.worker.kill();
    
} catch (error) {
   res.json(error) 
}
}
module.exports ={updateSingleState}