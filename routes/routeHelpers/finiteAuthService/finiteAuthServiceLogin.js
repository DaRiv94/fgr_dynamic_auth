const jwt  = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
config = require('../../../config');

let User = require('../../../databases/postgres/models/User')


// post "/" config.authServiceType=="simple"
async function postLoginFiniteAuthServiceType(req, res, email, password){
    console.log("postLoginFiniteAuthServiceType....")
    try{
        const user = await User.findOne({
            where: {
                email: email
            }
        })

        if (user===null){
            //No user found
            return res.status(404).json({detail:"Your Username or Password is incorrect"});
        }

        if(!bcrypt.compareSync(password, user.password_hash)){
            //Password was incorrect
            return res.status(404).json({detail:"Your Username or Password is incorrect"});
        }
        userData = {is_admin:user.is_admin, 
            email:user.email,
            email_verified:user.email_verified,
            id:user.id,
            createdAt:user.createdAt,
            updatedAt:user.updatedAt,
            token_createdAt: Date.now() }
        token= jwt.sign(userData, config.jwtsecret);
        responseObject = Object.assign({token}, userData);
        return res.send(responseObject);

    } catch(err){
        return res.status(400).json({Error:String(err)});
    }
}

exports.postLoginFiniteAuthServiceType = postLoginFiniteAuthServiceType;
