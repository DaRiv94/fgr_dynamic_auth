// require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
app = express();
const cors = require("cors");
config = require('./config');

console.log("config data:", config.name)
if(config.hasWhitelist){
    for (whitelabel in config.whitelist){
        console.log(config.whitelist[whitelabel]);
    }
}

app.use(cors())
app.use(bodyParser())

app.get("/", (req, res) => {
    res.send('Hello Worldzdddz')
})


app.get("/auth", (req, res) => {

    authobject = {
        hasConfig: false,
        config: {}
    }



    authobject.hasConfig = true
    authobject.config = config


    console.log(config.name)

    res.send({ "authobject": authobject })

})

port = process.env.PORT || 4000
app.listen(port, (err) => {
    if (!err) {
        console.log(`Listening on port: ${port}`)
    }
})