const express = require('express');
const router = express.Router();
config = require('../config');
let {postLoginSimpleAuthServiceType} = require("./simpleAuthServiceLogin");
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

