const Country = require('../models/country');
const APPECTATION = require('../config/constants');
const cluster = require('cluster');

const CountryMethod = new Country();

const saveCountry = async(req,res)=>{
try {

    let countryDetails ={name:req.body.name,code:req.body.code}
    let checkingCountry = await CountryMethod.findCountryDetails(countryDetails);
    if(checkingCountry) throw {success:false,msg:APPECTATION.STATUSMESSAGE.COUNTRY_ALREDY_EXIST}
    
    let countryDetailsObject = new Country({name:req.body.name,code:req.body.code})
    let saveCountry = await countryDetailsObject.save();
    res.json({success:true,msg:saveCountry})
    cluster.worker.kill();
} catch (error) {
   res.json(error) 
}
}
module.exports ={saveCountry}