const mongoose = require('mongoose');
config = require('../../config');

//https://docs.mongodb.com/manual/tutorial/query-documents/
//https://docs.mongodb.com/compass/master/query/filter/
module.exports=()=>{


db = config.database_connectionstring

//If there is a mongodb_dev and its development mode then use that db
if (config.database_connectionstring_dev && process.env.NODE_ENV=='development'){
     db = config.database_connectionstring_dev
}

mongoose.connect(db, { useNewUrlParser: true })
.then(()=> console.log(`Connecting to ${config.database_type} database...`));
}

if(config.default_user_email && default_user_password){
     console.log("Default user and default user password exist")
}
//if default users exist then create default users if they do not already exists
//check if default user and default admin exist in config
//if they do check db to see if they already exist
//if they do already exist, update their passwords with config passwords
//if they do not exist then create the default users in the db