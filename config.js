encodedconfig = process.env.FGRCONFIG
// simple default configuration
// let configObject = { 
//     authServiceType: "simple", 
//     userPassword: "Password123!",
//     adminPassword: "adminPassword123!",
//     whitelist:["http://localhost:4000"]
// }

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


//Sample 1 finite default configuration
// let configObject = {
//     authServiceType: "finite", 
//     default_user_email: "frankgriviera@outlook.com",
//     default_user_password: "Password123!",
//     default_admin_email: "frankgriviera@outlook.com",
//     default_admin_password: "adminPassword123!",
//     database_type:"POSTGRES",
//     database_connectionstring:"",
//     database_connectionstring_dev:"",
//     user_account_limit:  1,
//     admin_account_limit: 1,
//     whitelist:["*"]
// }

//Sample 2 finite default configuration (Registration, email verify)

let configObject = { 
    authServiceType: "finite", 
    default_admin_email: "frankgriviera@outlook.com",
    default_admin_password: "adminPassword123!",
    database_type:"MONGODB",
    database_connectionstring:"",
    database_connectionstring_dev:"",
    user_account_limit:  3,
    admin_account_limit: 1,
    whitelist:["*"]
}





//decode to get configuration data if it exists
if (encodedconfig) {
    let buff = Buffer.from(encodedconfig, 'base64');  
    let configString = buff.toString('utf-8');
    let config = JSON.parse(configString);

    configObject = config

    if(configObject.database_connectionstring){
        connection_string_to_parse = configObject.database_connectionstring
        if (config.database_connectionstring_dev && process.env.NODE_ENV=='development'){
            parsedconnectionstring = config.database_connectionstring_dev
        }
        var regex = new RegExp('[:/@]')
        const connection_string_array_to_parse = connection_string_to_parse.split(regex);
        let connectionstring_array = connection_string_array_to_parse.slice(3)
        configObject['DB_USERNAME'] = connectionstring_array[0]
        configObject['DB_PASSWORD'] = connectionstring_array[1]
        configObject['DB_HOST'] = connectionstring_array[2]
        configObject['DB_PORT'] = connectionstring_array[3]
        configObject['DB'] = connectionstring_array[4]
    }
    connection_string = config.database_connectionstring

}

module.exports = configObject;
