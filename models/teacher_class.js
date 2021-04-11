const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
	
	classId:{
		type:Schema.Types.ObjectId,
        ref:'class'
	},
    teacherId:{
        type:Schema.Types.ObjectId,
        ref:'teacher'
    },
	
},{timestamps : true});

module.exports = mongoose.model('teacher_class',UserSchema);
