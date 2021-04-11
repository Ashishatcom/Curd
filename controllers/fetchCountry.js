const Country = require('../models/country');
const APPECTATION = require('../config/constants');
const cluster = require('cluster');
const CountryMethod = new Country();

const fetchCountry = async(req,res)=>{
try {

    // let countryDetails ={name:req.body.name,code:req.body.code}
    let checkingCountry = await CountryMethod.findAllCountryDetails();
    if(!checkingCountry) throw {success:false,msg:APPECTATION.STATUSMESSAGE.COUNTRY_NOT_FOUND}
    
    // let countryDetailsObject = new Country({name:req.body.name,code:req.body.code})
    // let saveCountry = await countryDetailsObject.save();
    res.json({success:true,msg:checkingCountry})
    cluster.worker.kill();
    
} catch (error) {
   res.json(error) 
}
}
module.exports ={fetchCountry}