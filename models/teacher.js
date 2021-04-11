const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = Schema({
	name:{
		type:String
	},
    code:{
        type:String
    },
    password:{
        type:String
    },
    token:{
        type:String  
    }
	
},{timestamps : true});



UserSchema.methods.userHashingPassword = async (userPassword)=>{
   try {
   
    let hashingPassword =  await bcrypt.hash(userPassword, bcrypt.genSaltSync(10));
     if(!hashingPassword){
        throw new Error('SOMETHING_WRONG_HAPPEN_IN_PASSWOD_ENCRYPATION');
     }else{
    return hashingPassword;
      
     }
   } catch (error) {
    return error.message
   }
}

UserSchema.methods.findUserDetails = async (userDetails)=>{
    try {
        let Details = await User.findOne({code:userDetails.code})
        return Details
    } catch (e) {
        return e.message
    }
      
}
UserSchema.methods.isPasswordMatch = async (loginDetails,userDetailsInDatabase)=>{
    const PasswordMatch = await bcrypt.compare(loginDetails.password,userDetailsInDatabase.password);
     return PasswordMatch;
}




UserSchema.methods.findSpeficUserDetails = async (validUserId)=>{
    try {
        // console.log({fromModel:validUserId});
        let Details = await User.findOne({_id:validUserId.userId})
        console.log({fromModelDetails:Details});
        return Details
    } catch (e) {
        return e.message
    }
      
}
 const User =module.exports = mongoose.model('teacher',UserSchema);
