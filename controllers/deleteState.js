const State = require('../models/state');
const APPECTATION = require('../config/constants');
const cluster = require('cluster');

const deleteSingleState = async(req,res)=>{
try {
    let deleteState = await State.remove({_id:req.params.id});

    if(!deleteState) throw {success:false,msg:APPECTATION.STATUSMESSAGE.STATE_NOT_FOUND}
    
    res.json({success:true,msg:deleteState})
    cluster.worker.kill();
} catch (error) {
   res.json(error) 
}
}
module.exports ={deleteSingleState}