const express = require('express');
const router = express.Router();
config = require('../config');
const jwt = require("jsonwebtoken");
const auth = require('../middleware/auth');

router.post("/login", (req,res)=>{
    if (req.body && req.body.password){
        sentPassword = req.body.password

        if(config.authServiceType=="simple"){
            //With the simple service type this is at least one UserAccount password,
            return postLoginSimpleAuthServiceType(req, res, sentPassword)
        }

    }else{
        res.status(400).send("Please send password in body");
    }
});

//uses middleware to check password
router.post('/', auth, async (req, res) => {
    // use this for admins
    //if(!req.user.isAdmin) return res.status(403).send('You are not authorized to perform this action');
    return res.send(req.user)
});


module.exports=router;


// post "/" config.authServiceType=="simple"
function postLoginSimpleAuthServiceType(req, res, sentPassword){
    //If the sent password is equal to the userPassword, then do the following...
    if(sentPassword==config.userPassword){
        userData = { isAdmin:false}
        if(config.userMetadata){ //JUST AN FYI if config.userMetadata exists, it should always contain { isAdmin:false} within it
            userData = config.userMetadata
        }
        token= jwt.sign(userData, config.userPassword);
        return res.send({token});
    
    //If admin password exists, and the password is equal to admin password, then do the following...
    }else if(config.adminPassword && sentPassword==config.adminPassword){

        adminData = { isAdmin:true}
        if(config.userMetadata){ //JUST AN FYI if config.userMetadata exists, it should always contain { isAdmin:true} within it
            adminData = config.userMetadata
        }
        token= jwt.sign(adminData, config.adminPassword);
        return res.send({token});

    }else{
        return res.status(400).send("Invalid Password");
    }
}



