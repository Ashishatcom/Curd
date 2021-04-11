const Country = require('../models/country');
const APPECTATION = require('../config/constants');
const cluster = require('cluster');
const CountryMethod = new Country();

const updateSingleCountry = async(req,res)=>{
try {
    let checkingCountry = await CountryMethod.findSingleDetails(req.params.id);

    if(!checkingCountry) throw {success:false,msg:APPECTATION.STATUSMESSAGE.COUNTRY_NOT_FOUND}
    
    checkingCountry.name=req.body.name,
    checkingCountry.code=req.body.code
    let updateSaveCountry = await checkingCountry.save();
    res.json({success:true,msg:updateSaveCountry})
    cluster.worker.kill();
    
} catch (error) {
   res.json(error) 
}
}
module.exports ={updateSingleCountry}