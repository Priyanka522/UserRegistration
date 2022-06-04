var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
const sharp = require('sharp');
const fs = require('fs');

var user = require('../model/users.js');

const imageStorage = multer.diskStorage({
    destination: 'images', 
      filename: (req, file, cb) => {
          cb(null, file.originalname)
    }
});

var upload = multer({ storage: imageStorage })

router.post('/register',upload.single('image'),async(req,res)=>{
	const info = req.body;
	let compresspath = path.join('public',new Date().getTime() + ".jpeg")
	sharp(req.file.path).jpeg({
		quality:80
	}).toFile(compresspath,(err,imageRes)=>{
		if(err){
			res.send(err)
		}else{
			user.findOne({username:info.username},(err,data)=>{
				if(!data){
					var obj={
						username:info.username,
						fathersname:info.fathersname,
						dob:info.dob,
						mobile:info.mobile,
						address:info.address,
						profile:compresspath
					}
					user.create(obj,(err,userRes)=>{
						if(userRes){
							res.json({status:1,msg:'User Registered successfully'})
						}else{
							res.json({status:0,msg:err})
						}
					})
				}else{
					console.log('This user already exists');
				}
			})
		}
	})
	
})

module.exports = router;
