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