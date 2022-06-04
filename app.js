const express = require("express");
const mongoose = require("mongoose");

var usersRouter = require('./routes/users');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use('/', usersRouter);


mongoose.connect('mongodb://localhost:27017/UserRegistration',(err,result)=>{
	if(!err){
		console.log('mongodb connection succeeded')
	}else{
		console.log(err,'mongoerror')
	}
});



app.listen(3000, () => console.log('Server started'));
