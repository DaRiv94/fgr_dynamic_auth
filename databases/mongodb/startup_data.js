let config = require('../../read_config');
const { User }= require('./models/User');

module.exports= async ()=>{ 

    try{
        if(config.default_admin_email && config.default_admin_password){
            console.log("Default admin and default admin password existss")
            adminUser = await User.find({ email: config.default_admin_email})
            console.log("adminUsers", adminUser)
            if (!adminUser.length){
                
                 adminUser = new User({
                    color: (config.adminMetadata && config.adminMetadata.color) ? config.adminMetadata.color : "NOCOLOR",
                    isAdmin: true,
                    password: config.default_admin_password, //TODO make encripting passwords the default and storing as plain text a feature.
                    email: config.default_admin_email,
                });
            
                await adminUser.save();
                console.log("adminUser", adminUser)
            }
        }

        if(config.default_user_email && config.default_user_password){
            if (config.default_user_email == config.default_admin_email){
                 throw("Default user email and default admin email must be different")
            }
            console.log("Default user and default user password existss")
            user = await User.find({ email: config.default_user_email})
            console.log("users", user)
            if (!user.length){
    
                 user = new User({
                    color: (config.userMetadata && config.userMetadata.color)  ? config.userMetadata.color : "NOCOLOR",
                    isAdmin: false,
                    password: config.default_user_password, //TODO make encripting passwords the default and storing as plain text a feature.
                    email: config.default_user_email,
                });
            
                await user.save();
                console.log("user", user)
            }
            
        }
        //Note that accounts, admin and users alike can NOT share an email, I need to add validation for default users as well.
        //if default users exist then create default users if they do not already exists
        //check if default user and default admin exist in config
        //if they do check db to see if they already exist
        //if they do already exist, update their passwords with config passwords
        //if they do not exist then create the default users in the db
    }catch(e){
        console.log("error: ",e)
    }



}

