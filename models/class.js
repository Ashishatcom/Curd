const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
	name:{
		type:String
	},
    code:{
        type:String
    }
	
},{timestamps : true});

UserSchema.methods.findClassDetails = async (classDetails)=>{
    try {
        
        let classDetail = await Class.findOne({code:classDetails.code,name:classDetails.name})
        return classDetail
    } catch (e) {
        return e.message
    }
      
}

UserSchema.methods.findAllClassDetails = async ()=>{
    try {
        
        let fetchClassDetail = await Class.find({})
        return fetchClassDetail
    } catch (e) {
        return e.message
    }
      
}

UserSchema.methods.findSingleDetails = async (id)=>{
    try {
        
        let findSingleDetail = await Class.findOne({_id:id})
        return findSingleDetail
    } catch (e) {
        return e.message
    }
      
}

const Class = module.exports = mongoose.model('class',UserSchema);
