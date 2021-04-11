const State = require('../models/state');
const APPECTATION = require('../config/constants');
const cluster = require('cluster');

const StateMethod = new State();

const saveState = async(req,res)=>{
try {

    let stateDetails ={name:req.body.name,code:req.body.code}
    let checkingState = await StateMethod.findStateDetails(stateDetails);
    if(checkingState) throw {success:false,msg:APPECTATION.STATUSMESSAGE.STATE_ALREDY_EXIST}
    
    let stateDetailsObject = new State({name:req.body.name,code:req.body.code,countryId:req.body.countryId})
    let saveStates = await stateDetailsObject.save();
    res.json({success:true,msg:saveStates})
    cluster.worker.kill();
} catch (error) {
   res.json(error) 
}
}
module.exports ={saveState}