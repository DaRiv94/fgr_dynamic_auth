Welcome to the FGR Dynamic auth service!!

Thanks for checking out the readme for this docker file-  `docker run dariv94\/fgrauthservice npm run readme`

You will need to create a config file and encode it then add it as the env var FGRCONFIG
Create a config.json file like this...

```
{ 
"authServiceType": "simple", 
"userPassword": "Password123!",
"adminPassword": "adminPassword123!",
"whitelist":["http://localhost:4000"]
}
```



 where...
    
authServiceType [required]
---
__"simple"__ - One user account, one Admin account  _(NOTE: only this works at the moment)_

__"finite"__ - Finite user accounts, finite admin accounts

__"multi"__ - Many user accounts, many admin accounts

EX: `"authServiceType": "simple"`

userPassword _(simple authServiceType only, )_ [required]
---
 __\<String\>__ - User Password
 
EX `"userPassword": "Password123!"`

 userMetadata _(simple authServiceType only)_ 
---
 __\<Object\>__ - User Metadata
 
EX `"adminMetadata": { "isAdmin":false, color:"blue"}`

adminPassword _(simple authServiceType only, )_
---
 __\<String\>__ - User Password
 
EX `"adminPassword": "adminPassword123!"`

 adminMetadata _(simple authServiceType only)_ 
---
 __\<Object\>__ - Admin Metadata
 
EX `"adminMetadata": { "isAdmin":true, color:"purple"}`

whitelist (all authServiceTypes ) [required]
---
 __\<Array\>__ - Array of Strings where the strings of domains to whitelist
 
EX `"whitelist":["http://localhost:4000"]`

Then (assuming you have the docker client and daemon) and in the same directory as your config.json file, run... 

`docker run -it -v ${pwd}/config.json:/app/config.json dariv94/fgrauthservice npm run config`

(replace FGRCONFIG value here with the output from the above cmd) 
Then with the env file, run `docker run --rm -p 4000:4000 --env-file .env dariv94/fgrauthservice`
```
PORT=4000
NODE_ENV=development
FGRCONFIG=eyJhdXRoU2VydmljZVR5cGUiOiJzaW1wbGUiLCJ1c2VyUGFzc3dvcmQiOiJQYXNzd29yZDEiLCJ1c2VyTWV0YWRhdGEiOnsiaXNBZG1pbiI6ZmFsc2UsImNvbG9yIjoiYmx1ZSJ9LCJhZG1pblBhc3N3b3JkIjoiYWRtaW4xIiwiYWRtaW5NZXRhZGF0YSI6eyJpc0FkbWluIjp0cnVlLCJjb2xvciI6InB1cnBsZSJ9LCJ3aGl0ZWxpc3QiOlsiaHR0cDovL2xvY2FsaG9zdDo0MDAwIl19
```