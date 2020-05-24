encodedconfig = process.env.FGRCONFIG

//default configuration
let configObject = { 
    name: "alan",
    username: "alanusername",
    password: "alanpassword",
    hasWhitelist : false,
    endpoints: 1
}

//decode to get configuration data
if (encodedconfig) {
    let buff = Buffer.from(encodedconfig, 'base64');  
    let configString = buff.toString('utf-8');
    let config = JSON.parse(configString);

    configObject = config
}

module.exports = configObject;
