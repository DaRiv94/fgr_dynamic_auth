console.log("Welcome to the FGR Dynamic auth service!!")

console.log("thanks for checking out the readme for this docker file-  docker run fgrauth npm run readme")

console.log("You will need to create a config file and encode it then add it as the env var FGRCONFIG")
console.log("Create a config.json file like this...")
console.log()
console.log(`
{ 
"authServiceType": "simple", 
"userPassword": "Password123!",
"adminPassword": "adminPassword123!",
"whitelist":["http://localhost:4000"]
}
`)

console.log(
    `

 where...
    //-- authServiceType:
    //"Simple" - one user account, one Admin account 
    //"finite" - finite user accounts, finite admin accounts
    //"multi" - many user accounts, many admin accounts
    authServiceType: "simple", 


    //-- userPassword (simple authServiceType only, [required]) 
    // <String> of user password
    userPassword: "Password123!",

    //-- userMetadata (simple authServiceType only) for addtional data 
    // <Object> of user metadata
    //userMetadata: { isAdmin:false, color:"blue"},

    //-- adminPassword (simple authServiceType only) 
    // <String> 
    adminPassword: "adminPassword123!",

    //-- adminMetadata (simple authServiceType only) for addtional data 
    // <Object> of admin metadata
    //adminMetadata: { isAdmin:true, color:"purple"},

    // -- whitelist (all authServiceTypes [required])
    // <Array>
    whitelist:["http://localhost:4000"]

`)

console.log()
console.log("Then (assuming you have the docker client and daemoen) and in the same directory as your config.json file, run... ")

console.log("docker run -it dariv94/fgrauthservice npm run config")
console.log("docker run -it -v ${pwd}/config.json:/app/config.json dariv94/fgrauthservice npm run config")
