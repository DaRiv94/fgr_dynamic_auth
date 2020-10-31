require('dotenv').config()
console.log("GGGGOOOT HEHERE")
config = require('../../config')
module.exports = {
    development: {
        username: config.DB_USERNAME,
        password: config.DB_PASSWORD,
        database: config.DB,
        host: config.DB_HOST,
        port: config.DB_PORT,
        dialect: 'postgres'
    }
  };