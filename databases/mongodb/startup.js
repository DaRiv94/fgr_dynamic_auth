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


mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> {
     console.log(`Connecting to ${config.database_type} database...`);
     
     //If connection is successful, then create default start up data if specified in configuration.
     require("./startup_data")();

     });
}

