// for development, I incude this file to create base 64 encoded string for dynamic auth service

let base64data;
try {
    let configjsonfile = require("./config.json");

    let jsonString = JSON.stringify(configjsonfile);
    let buff = Buffer.from(jsonString) // New
    // let buff = Buffer.from(configjsonfile) // New
    base64data = buff.toString('base64');

} catch (error) {
    console.log(`error ${error}...`)
    console.log("NO config.json found!!!!")
    console.log("configuring defaults...")

    //object

    let configObject = { 

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
    }

    let jsonString = JSON.stringify(configObject);
    let buff = Buffer.from(jsonString) // New
    base64data = buff.toString('base64');

}





console.log("----------------");
console.log(base64data);
console.log("----------------");














//////Decoding

// let buff2 = Buffer.from(base64data, 'base64');  
// let jsonString2 = buff2.toString('utf-8');

// console.log(jsonString2); 

// var decodedjsobjectconfig = JSON.parse(jsonString2);

// console.log("decoded javascript String : " + decodedjsobjectconfig);
// console.log("decoded javascript String key value : " + decodedjsobjectconfig.name);

/////////////////////////////////////////////////////////////////////////////////////////////


/*
let jsobjectconfig = { 
    name: "john",
    username: "johnusername",
    password: "johnpassword"
}
*/

//FGRCONFIG=eyJuYW1lIjoiam9obiIsInVzZXJuYW1lIjoiam9obnVzZXJuYW1lIiwicGFzc3dvcmQiOiJqb2hucGFzc3dvcmQifQ==


// let jsobjectconfig = { 
//     name: "john",
//     username: "johnusername",
//     password: "johnpassword",
//     hasWhitelist : true,
//     whitelist: ["http://localhost:3000","http://localhost:4000"],
//     endpoints: 2
// }


//FGRCONFIG=eyJuYW1lIjoiam9obiIsInVzZXJuYW1lIjoiam9obnVzZXJuYW1lIiwicGFzc3dvcmQiOiJqb2hucGFzc3dvcmQiLCJoYXNXaGl0ZWxpc3QiOnRydWUsIndoaXRlbGlzdCI6WyJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJodHRwOi8vbG9jYWxob3N0OjQwMDAiXSwiZW5kcG9pbnRzIjoyfQ==