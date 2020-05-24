const mongoose = require('mongoose');
config = require('../config');

//https://docs.mongodb.com/manual/tutorial/query-documents/
//https://docs.mongodb.com/compass/master/query/filter/
module.exports=()=>{


db = config.mongodb

//If there is a mongodb_dev and its development mode then use that db
if (config.mongodb_dev && process.env.NODE_ENV=='development'){
     db = config.mongodb_dev
}

mongoose.connect(db, { useNewUrlParser: true })
.then(()=> console.log(`Connecting to ${db_env} database...`));

}