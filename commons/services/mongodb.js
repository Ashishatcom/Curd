const mongoose = require('mongoose');
const { MONGO_URI } = require('../../config/constants');

let count = 0;

const options = {
	autoIndex: false,
	poolSize : 10,
	useNewUrlParser : true,
	useUnifiedTopology : true,
}

const connect = ()=>{
	mongoose.connect(MONGO_URI,options)
	.then(()=>{
		console.log('MongoDB is connected');
	})
	.catch(err=>{
		console.log('MongoDB connection unsuccessfull trying again in 5 seconds',++count); 
		console.log('Error caused =>',err.message);
		setTimeout(connect,5000);
		if(count >3)
			process.exit();
	})
}


module.exports = {connect};