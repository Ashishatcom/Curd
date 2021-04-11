const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
	name:{
		type:String
	},
    code:{
        type:String
    },
	
},{timestamps : true});

UserSchema.methods.findCountryDetails = async (countryDetails)=>{
    try {
        
        let countryDetail = await country.findOne({code:countryDetails.code,name:countryDetails.name})
        return countryDetail
    } catch (e) {
        return e.message
    }
      
}
UserSchema.methods.findAllCountryDetails = async ()=>{
    try {
        
        let fetchcountryDetail = await country.find({})
        return fetchcountryDetail
    } catch (e) {
        return e.message
    }
      
}
UserSchema.methods.findSingleDetails = async (id)=>{
    try {
        
        let findSingleDetail = await country.findOne({_id:id})
        return findSingleDetail
    } catch (e) {
        return e.message
    }
      
}


const country = module.exports = mongoose.model('country',UserSchema);
