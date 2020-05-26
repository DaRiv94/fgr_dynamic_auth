const jwt  = require('jsonwebtoken');

// post "/" config.authServiceType=="simple"
function postLoginSimpleAuthServiceType(req, res, sentPassword){
    //If the sent password is equal to the userPassword, then do the following...
    if(sentPassword==config.userPassword){
        userData = { isAdmin:false}
        if(config.userMetadata){ //JUST AN FYI if config.userMetadata exists, it should always contain { isAdmin:false} within it
            if (!('isAdmin' in config.userMetadata)){
                config.userMetadata = Object.assign({ isAdmin:false}, config.userMetadata);
            }
            userData = config.userMetadata
        }
        token= jwt.sign(userData, config.userPassword);
        return res.send({token});
    
    //If admin password exists, and the password is equal to admin password, then do the following...
    }else if(config.adminPassword && sentPassword==config.adminPassword){

        adminData = { isAdmin:true}
        if(config.adminMetadata){ //JUST AN FYI if config.userMetadata exists, it should always contain { isAdmin:true} within it
            if (!('isAdmin' in config.adminMetadata)){
                config.adminMetadata = Object.assign({ isAdmin:true}, config.adminMetadata);
            }
            adminData = config.adminMetadata
        }
        token= jwt.sign(adminData, config.adminPassword);
        return res.send({token});

    }else{
        return res.status(400).send("Invalid Password");
    }
}

exports.postLoginSimpleAuthServiceType = postLoginSimpleAuthServiceType;
