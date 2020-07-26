// require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
app = express();
config = require('./config');

// console.log("config data:", config.name)
// if(config.hasWhitelist){
//     for (whitelabel in config.whitelist){
//         console.log(config.whitelist[whitelabel]);
//     }
// }

// parse application/json
app.use(bodyParser.json());
console.log("config.authServiceType",config.authServiceType)
//TODO only have this if MONGODB is database type!!
if(config.authServiceType=="finite"){
    if(config.database_type=="MONGODB"){
        console.log("Configuring Mongodb With Auth Service...")
        require('./databases/mongodb/startup')();
    }
    if(config.database_type=="MYSQL"){
        console.log("Configuring MySQL With Auth Service...")
        require('./databases/mysql/startup')();
    }
}


require('./startup/cors')(app);
require('./startup/routes')(app);


module.exports = app;