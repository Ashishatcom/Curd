const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
	name:{
		type:String
	},
    code:{
        type:String
    },
    countryId:{
        type:Schema.Types.ObjectId,
        ref:'country'
    },
	
},{timestamps : true});


UserSchema.methods.findStateDetails = async (stateDetails)=>{
    try {
        
        let stateDetail = await State.findOne({code:stateDetails.code,name:stateDetails.name})
        return stateDetail
    } catch (e) {
        return e.message
    }
      
}
UserSchema.methods.findAllStateDetails = async ()=>{
    try {
        
        let fetchcountryDetail = await State.find({}).populate('countryId','name code');
        return fetchcountryDetail
    } catch (e) {
        return e.message
    }
      
}

UserSchema.methods.findSingleDetails = async (id)=>{
    try {
        
        let findSingleDetail = await State.findOne({_id:id})
        return findSingleDetail
    } catch (e) {
        return e.message
    }
      
}

const State = module.exports = mongoose.model('state',UserSchema);
