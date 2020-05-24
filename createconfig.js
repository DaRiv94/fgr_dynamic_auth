// for development, I incude this file to create base 64 encoded string for dynamic auth service


//object

let jsobjectconfig = { 
    name: "john",
    username: "johnusername",
    password: "johnpassword",
    hasWhitelist : true,
    whitelist: ["http://localhost:3000","http://localhost:4000"],
    endpoints: 2
}


///ecnode object

// console.log("New javascript String : " + jsobjectconfig);
// console.log("New javascript String key value : " + jsobjectconfig.name);



let jsonString = JSON.stringify(jsobjectconfig);

// console.log("New JSON String : " + jsonString);

// let buff = new Buffer(jsonString);
let buff = Buffer.from(jsonString) // New
let base64data = buff.toString('base64');

// console.log('"' + jsonString + '" converted to Base64 is "' + base64data + '"');

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