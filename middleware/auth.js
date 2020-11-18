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

            //Token expires in 3,600,000 milliseconds (1 hour) (1000 is 1 second: 60000 is one minute)
            if(Date.now() - decoded.token_createdAt > 3600000){
                return res.status(400).send('Token Expired')
            }

            req.user = decoded;
            next();
        }catch(ex){
            return res.status(400).send('Invalid token')
        }
    }
}
