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
	classId:{
		type:Schema.Types.ObjectId,
        ref:'class'
	},
    username:{
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

UserSchema.methods.findStudentDetails = async (userDetails)=>{
    try {
        let Details = await Student.findOne({code:userDetails.code,username:userDetails.username})
        return Details
    } catch (e) {
        return e.message
    }
      
}
UserSchema.methods.isPasswordMatch = async (loginDetails,userDetailsInDatabase)=>{
    const PasswordMatch = await bcrypt.compare(loginDetails.password,userDetailsInDatabase.password);
     return PasswordMatch;
}

UserSchema.methods.findSingleDetails = async (validUser)=>{
    try {
        let Details = await Student.findOne({_id:validUser})
        return Details
    } catch (e) {
        return e.message
    }
      
}
 const Student =module.exports = mongoose.model('student',UserSchema);
