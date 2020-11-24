Welcome to the FGR Dynamic auth service!!

Docker image - https://hub.docker.com/repository/docker/dariv94/fgrauthservice

QuickStart
---
1. Create config.json file with configuration data. (check this readme or the config.js file for commented examples)
2. run `node ./createconfig.js` in the root folder where your config.js file is and add the output of the file as your *FGRCONFIG* to your .env file
3. Start docker-compose `docker-compose up`
4. (finite config using sequelize orm only, Run migrations `docker exec fgr_dynamic_auth_web_1 npx sequelize db:migrate`)


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
 NOTE: to allow for all origins add `["*"]` ad the whitelist value.
 
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

authServiceType:simple  Endpoints
---

/auth/login
----
- Endpoint: `/auth/login`
- Method: `POST`
- Request Body: `{"password":"<PASSWORD_HERE>"}`
- 200 Return Body: `{"token":"<JWT_TOKEN_WILL_BE_HERE>"}` (Content-Type: application/json)
- 400 Retrun body: `Invalid Password`  (Content-Type: text/html)

Fetch Example...
```
  const response = fetch('http://localhost:4000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password:"mypassword"})
  });
  console.log(response.body)
```

/auth
----
- Endpoint: `/auth`
- Method: `POST`
- Request Header: `a-auth-token:<JWT_TOKEN_WILL_BE_HERE>`
- Request Body: `none`
- 400 Retrun body: `Invalid Password`  (Content-Type: text/html)

Fetch Example...
```
  const response = fetch('http://localhost:4000/auth', {
    method: 'POST',
    headers: {
      'x-auth-token': 'application/json'
    },
  });
  console.log(response.body)
```

----
Build and Start with docker toolbox (Windows 10 Home)

`docker build -f Dockerfile.dev -t fgrdauth .`

`docker run --rm -p 4000:4000 --name fgr_dynamic_auth_web_1 --network budget --env-file .env -e CHOKIDAR_USEPOLLING=true -v /app/node_modules  -v /c/Users/frank/OneDrive/Development/02_Projects_In_Production/0027_PersonalBudgetApp/fgr_dynamic_auth:/app fgrdauth`

---
ENV example for fgr budget kubernetes used config.json...
```
{ 
    "authServiceType": "finite", 
    "default_admin_email": "frankgriviera@outlook.com",
    "default_admin_password": "adminPassword123!",
    "database_type":"POSTGRES",
    "database_connectionstring":"postgres://postgres:postgres@pg1:5432/local_fgr_budget",
    "user_account_limit":  3,
    "admin_account_limit": 1,
    "jwtsecret":"my_jwtsecret_here",
    "whitelist":["*"]
}
```
This was encypted and then added to the env file. so then the env file was 
```
FGRCONFIG=eyJhdXRoU2VydmljZVR5cGUiOiJmaW5pdGUiLCJkZWZhdWx0X2FkbWluX2VtYWlsIjoiZnJhbmtncml2aWVyYUBvdXRsb29rLmNvbSIsImRlZmF1bHRfYWRtaW5fcGFzc3dvcmQiOiJhZG1pblBhc3N3b3JkMTIzISIsImRhdGFiYXNlX3R5cGUiOiJQT1NUR1JFUyIsImRhdGFiYXNlX2Nvbm5lY3Rpb25zdHJpbmciOiJwb3N0Z3JlczovL3Bvc3RncmVzOnBvc3RncmVzQHBnMTo1NDMyL2xvY2FsX2Zncl9idWRnZXQiLCJ1c2VyX2FjY291bnRfbGltaXQiOjMsImFkbWluX2FjY291bnRfbGltaXQiOjEsImp3dHNlY3JldCI6ImZncmFiYzEyMyIsIndoaXRlbGlzdCI6WyIqIl19
NODE_ENV=development
PORT=4000
```