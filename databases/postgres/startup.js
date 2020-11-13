const Sequelize = require('sequelize')
config = require('../../config');


connection_string = config.database_connectionstring

//If there is a mongodb_dev and its development mode then use that db
if (config.database_connectionstring_dev && process.env.NODE_ENV=='development'){
    connection_string = config.database_connectionstring_dev
}

//Postgres DB
const db = new Sequelize(connection_string, {
    dialect: 'postgres'
  })

db
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = db