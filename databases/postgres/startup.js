const Sequelize = require('sequelize')
config = require('../../read_config');


connection_string = config.database_connectionstring

//If there is a mongodb_dev and its development mode then use that db
if (config.database_connectionstring_dev && process.env.NODE_ENV == 'development') {
    connection_string = config.database_connectionstring_dev
}




// const db = new Sequelize(connection_string, {
//     dialect: 'postgres',
//     ssl: true,
//     dialectOptions: {
//         ssl: {
//             require: true
//         }
//     }
// }) ? process.env.NODE_ENV == 'production'
//     : new Sequelize(connection_string, {
//         dialect: 'postgres'
//     })

// const db = new Sequelize(connection_string, {
//     dialect: 'postgres'
// }) 

// const db = new Sequelize(connection_string, {
//     dialect: 'postgres',
//     ssl: true,
//     dialectOptions: {
//         ssl: {
//             require: true
//         }
//     }
// }) 

const db = process.env.NODE_ENV == 'development' ?
    new Sequelize(connection_string, {
        dialect: 'postgres'
    }) : new Sequelize(connection_string, {
        dialect: 'postgres',
        ssl: true,
        dialectOptions: {
            ssl: {
                require: true
            }
        }
    })



//The SSL may be on connnection string seeing as ?sslmode=require I might add logic later to add ssl above based on this in connection string or not





db
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = db