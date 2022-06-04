var mongoose = require('mongoose');

var userSchema=new mongoose.Schema({
	username:String,
	fathersname:String,
	dob:String,
	mobile:String,
	address:String,
	profile:String,
	createdAt:{type:Date,default:Date.now()}
},{"versionKey":false});

var user = mongoose.model('userprofile',userSchema);

module.exports=user;
