const Country = require('../models/country');
const APPECTATION = require('../config/constants')
const CountryMethod = new Country();
const cluster = require('cluster');
const deleteSingleCountry = async(req,res)=>{
try {
    let deleteCountry = await Country.remove({_id:req.params.id});

    if(!deleteCountry) throw {success:false,msg:APPECTATION.STATUSMESSAGE.COUNTRY_NOT_FOUND}
    
    res.json({success:true,msg:deleteCountry})
    cluster.worker.kill();
} catch (error) {
   res.json(error) 
}
}
module.exports ={deleteSingleCountry}