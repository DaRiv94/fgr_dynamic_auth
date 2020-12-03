const jwt  = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
config = require('../../../read_config');

let User = require('../../../databases/postgres/models/User')

// post "/" config.authServiceType=="finite"
async function postLoginFiniteAuthServiceType(req, res, email, password){
    console.log("postLoginFiniteAuthServiceType....")
    try{
        
        // I will want to create a repository functions for when I implement other databases
        // Then I will do simple calls like const user = await getUserByEmail(email)
        const user = await User.findOne({
            where: {
                email: email.toLowerCase()
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

        //Serialize Response
        userData = {
            is_admin:user.is_admin, 
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
