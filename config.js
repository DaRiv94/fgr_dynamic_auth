encodedconfig = process.env.FGRCONFIG
// simple default configuration
let configObject = { 
    authServiceType: "simple", 
    userPassword: "Password123!",
    adminPassword: "adminPassword123!",
    whitelist:["http://localhost:4000"]
}

// // simple default configuration
// let configObject = { 

//     //-- authServiceType:
//     //"Simple" - one user account, one Admin account 
//     //"finite" - finite user accounts, finite admin accounts
//     //"multi" - many user accounts, many admin accounts
//     authServiceType: "simple", 


//     //-- userPassword (simple authServiceType only, [required]) 
//     // <String> of user password
//     userPassword: "Password123!",

//     //-- userMetadata (simple authServiceType only) for addtional data 
//     // <Object> of user metadata
//     //userMetadata: { isAdmin:false, color:"blue"},

//     //-- adminPassword (simple authServiceType only) 
//     // <String> 
//     adminPassword: "adminPassword123!",

//     //-- adminMetadata (simple authServiceType only) for addtional data 
//     // <Object> of admin metadata
//     //adminMetadata: { isAdmin:true, color:"purple"},

//     // -- whitelist (all authServiceTypes [required])
//     // <Array>
//     whitelist:["http://localhost:4000"]
// }


//Sample finite default configuration

// let configObject = { 
//     authServiceType: "finite", 
//     default_user_email: "frankgriviera@outlook.com",
//     default_user_password: "Password123!",
//     default_admin_email: "frankgriviera@outlook.com",
//     default_admin_password: "adminPassword123!",
//     database_type:"MONGODB",
//     database_connectionstring:"",
//     database_connectionstring_dev:"",
//     user_account_limit:  1,
//     admin_account_limit: 1,
//     whitelist:["*"]
// }





//decode to get configuration data if it exists
if (encodedconfig) {
    let buff = Buffer.from(encodedconfig, 'base64');  
    let configString = buff.toString('utf-8');
    let config = JSON.parse(configString);

    configObject = config
}

module.exports = configObject;
