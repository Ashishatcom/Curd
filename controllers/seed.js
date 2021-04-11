const country = require('../seeders/country.json');
const countryModel = require('../models/country');
const APPECTATION = require('../config/constants');
const cluster = require('cluster')
// const { connect } = require('./commons/services/mongodb');

const seeding = async (req,res)=>{

    try {
        let clearCountryDatabase = await countryModel.remove()

        if(!clearCountryDatabase) throw new Error (APPECTATION.STATUSMESSAGE.SOMETHING_WRONG_HAPPEN_PLEASE_TRY_ONCE_AGAIN)
        console.log(clearCountryDatabase);
         await countryModel.insertMany(country);
        res.json ({success:true,msg:APPECTATION.STATUSMESSAGE.DATA_SEDED_IN_DATABASE});
        cluster.worker.kill()
    } catch (error) {
      res.json({success:false,msg: error.message})
    }

}
module.exports = {
    seeding
}