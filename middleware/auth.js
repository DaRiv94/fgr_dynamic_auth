const jwt  = require('jsonwebtoken');
config = require('../config');


///THIS NEEDS TO BE UPDATED!!
module.exports=function (req, res, next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Unauthorized, no auth token provided');

    //Middleware for Auth With simple
    if(config.authServiceType=="simple"){
        try{
            const decoded = jwt.verify(token, config.userPassword);
            req.user = decoded;
            next();
        }catch(ex){
            
            if(config.adminPassword){
                try{
                    const decoded = jwt.verify(token, config.adminPassword);
                    req.user = decoded;
                    next();
                }catch(ex){
                    return res.status(400).send('Invalid token')
                }
            }else{
                return res.status(400).send('Invalid token')
            }

        }
    }else if(config.authServiceType=="finite"){
        try{
            const decoded = jwt.verify(token,config.jwtsecret);

            //Token expires in 180,000 milliseconds (3 hours)
            if(Date.now() - decoded.token_createdAt > 180,000){
                return res.status(400).send('Token Expired')
            }

            req.user = decoded;
            next();
        }catch(ex){
            return res.status(400).send('Invalid token')
        }
    }
}
