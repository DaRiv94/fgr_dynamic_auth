Uses Config FGRCONFIG to configure the dynamic auth service so it can be used as an auth service in multiple apps


create FGRCONFIG like so

```

let jsobjectconfig = { 
    name: "john",
    username: "johnusername",
    password: "johnpassword",
    hasWhitelist : true,
    whitelist: ["http://localhost:3000","http://localhost:4000"],
    endpoints: 2
}

let jsonString = JSON.stringify(jsobjectconfig);
let buff = Buffer.from(jsonString) // New
let base64data = buff.toString('base64');

```

Where now `base64data` shoule be FGRCONFIG

in .env
```
FGRCONFIG=<base64data>
```
-----

Examples
---

```
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

//After Encoding this would be
//FGRCONFIG=eyJhdXRoU2VydmljZVR5cGUiOiJzaW1wbGUiLCJ1c2VyUGFzc3dvcmQiOiJQYXNzd29yZDEyMyEiLCJhZG1pblBhc3N3b3JkIjoiYWRtaW5QYXNzd29yZDEyMyEiLCJ3aGl0ZWxpc3QiOlsiaHR0cDovL2xvY2FsaG9zdDo0MDAwIl19
```


When this is "connected" to an app, it this should be configuration specifying if auth is enabled, 

Authentication
`POST` to `/auth/login` with a body of `{"password":<YOURPASSWORD>}`
Will return token to be used in future requests

Authorization
`POST` to `/auth/` with header token from login `x-auth-token:<JWT_HERE>`
Will return User details and relevant metadata
