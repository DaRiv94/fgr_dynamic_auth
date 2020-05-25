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


if(!config.authServiceType=="simple"){
    console.log("Configuring Mongodb With Auth Service...")
    require('./startup/mongodb')();
}


require('./startup/cors')(app);
require('./startup/routes')(app);


module.exports = app;