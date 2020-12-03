const express = require("express");
const bodyParser = require("body-parser");
app = express();
config = require('./read_config');

// parse application/json
app.use(bodyParser.json());
console.log("config.authServiceType", config.authServiceType)

if (config.authServiceType == "finite") {


    //POSTGRES
    if (config.database_type == "POSTGRES") {
        console.log("Configuring Postgres With Auth Service...")
        let db = require('./databases/postgres/startup');
    }

    // Next option for the future
    // //MONGODB
    // if (config.database_type == "MONGODB") {
    //     console.log("Configuring Mongodb With Auth Service...")
    //     require('./databases/mongodb/startup')();
    // }

    // Maybe an option for the future
    // if(config.database_type=="MYSQL"){
    //     console.log("Configuring MySQL With Auth Service...")
    //     require('./databases/mysql/startup')();
    // }
}


require('./startup/cors')(app);
require('./startup/routes')(app);


module.exports = app;