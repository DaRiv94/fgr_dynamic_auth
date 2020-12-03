//This file is used to create a base 64 encoded string for dynamic auth service

const fs = require('fs');

// console.log("args:", )

fs.access('config.json', (err) => {
    if (err) {
        //err if not config.json file exists
        console.log("config.json file is requried!");
        console.log("Error:", err)
    } else {
        //config.json file exists

        let should_overwrite_existing_env = false
        let base64data;
        let port_in_config = false;
        let port = ""
        let node_env_in_config = false;
        let node_env = ""
        try {

            // Read in config.json file
            let config = require("./config.json");
            console.log("config.json:", config)

            // convert into a binary buffer and then the buffer into a base64 encoded string
            let jsonString = JSON.stringify(config);
            let buff = Buffer.from(jsonString)
            base64data = buff.toString('base64');

            
            let env_filename_to_create = ".env"
            let free_env_filename = false
            if (fs.existsSync('.env') && process.argv[2]!=='overwrite') {
                console.log(".env exists.");
                let i = 0;
                while (!free_env_filename) {

                    if (fs.existsSync(i + '_copy.env')) {
                        console.log(`The file ${i + '_copy.env'} exists.`);
                    } else {
                        console.log(`The file ${i + '_copy.env'}  does not exist.`);
                        env_filename_to_create = i + '_copy.env'
                        free_env_filename = true
                    }
                    i++;
                }
            }

            // Compose env file.
            env_contents = `FGRCONFIG=${base64data}\n`;
            if (config.node_env) env_contents += `NODE_ENV=${config.node_env}\n`;
            if (config.port) env_contents += `PORT=${config.port}\n`;

            // Create env file
            fs.writeFile(env_filename_to_create, env_contents, (err) => {
                if (err) throw err;
                //Successfully created env file
                console.log(`Successfuly created ${env_filename_to_create}!`);
            });

        } catch (error) {
            console.log(`Error Creating .env fromc config.json ${error}...`)
        }
    }
});






    // //object

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

    // let jsonString = JSON.stringify(configObject);
    // let buff = Buffer.from(jsonString) // New
    // base64data = buff.toString('base64');



















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