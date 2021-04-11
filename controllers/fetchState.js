const State = require('../models/state');
const APPECTATION = require('../config/constants');
const cluster = require('cluster');
const StateMethod = new State();

const fetchState = async(req,res)=>{
try {

    let checkingState = await StateMethod.findAllStateDetails();
    if(!checkingState) throw {success:false,msg:APPECTATION.STATUSMESSAGE.STATE_NOT_FOUND}
    
    res.json({success:true,msg:checkingState})
    cluster.worker.kill();
    
} catch (error) {
   res.json(error) 
}
}
module.exports ={fetchState}