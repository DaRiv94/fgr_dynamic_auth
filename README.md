Welcome to the FGR Dynamic auth service!!

## What is this project?

FGR Dynamic Auth Service was created so that I ([Frankie Riviera](https://frankieriviera.com)) would be able to quickly spin up an authentication and authorization service for my personal projects, while also being dynamic in that it can be configured quickly and easily for different use cases.

However I have intended on structuring this Readme in such a way that anyone could pull the Docker Image and plug and play with this Auth microservice to hopfully save them from rewriting auth logic the way it has for me.

### The DockerHub image can be found [here](https://hub.docker.com/repository/docker/dariv94/fgrauthservice)
Pull down Image
```
docker pull fgrauthservice
```

# QuickStart

### Prerequisites
- Docker - find intructions on install docker [here](https://docs.docker.com/get-docker/)
- A learners mindset. - I live by the phrase *"Everything is hard until you know it"*

### 1. Create config.json file with configuration data. (Find documentation and examples on config.json file below)
### 2. In the same directory as your config.json file, run the following...  
**Powershell** 
```
docker run -it --rm -v ${pwd}/config.json:/app/config.json fgrauthservice npm run config
```
 **Bash/Zsh**
 ```
 docker run -it --rm -v $(pwd)/config.json:/app/config.json fgrauthservice npm run config
 ```
 
 This should output your *.env* file which should contain your FGRCONFIG base64 encoded Key value pair, along with the PORT and NODE_ENV key value pairs if they were specified in your config.json.
 *NOTE*: If there was already an existing *.env* file, this command will output *0_copy.env* and then if that exists it will put put *1_copy.env* and so on..
 ### 3. Then start the auth microservice!
```
docker run --rm -p 4000:4000 --from-env .env fgrauthservice
```
Your should now be able to send a GET request to http://localhost:4000/healthy and get a HTTP 200 OK response.

<!-- 2. run `node ./createconfig.js` in the root folder where your config.js file is and add the output of the file as your *FGRCONFIG* to your .env file
3. Start docker-compose `docker-compose up`
4. (finite config using sequelize orm only, Run migrations `docker exec fgr_dynamic_auth_web_1 npx sequelize db:migrate`) -->
<!-- 

Thanks for checking out the readme for this docker file-  `docker run dariv94\/fgrauthservice npm run readme` -->

<!-- You will need to create a config file and encode it then add it as the env var FGRCONFIG
Create a config.json file like this... -->

# Simple Auth config.json Example 

```
{ 
"authServiceType": "simple", 
"userPassword": "Password123!",
"adminPassword": "adminPassword123!",
"whitelist":["http://localhost:4000"]
}
```

# Options
    
authServiceType [required]
---
__"simple"__ - One user account, one Admin account  _(NOTE: only this works at the moment)_

__"finite"__ - Finite user accounts, finite admin accounts

__"multi"__ - Many user accounts, many admin accounts

EX: `"authServiceType": "simple"`

userPassword _(simple authServiceType only)_ [required]
---
 __\<String\>__ - User Password
 
EX `"userPassword": "Password123!"`

 userMetadata _(simple authServiceType only)_ 
---
 __\<Object\>__ - User Metadata
 
EX `"adminMetadata": { "isAdmin":false, color:"blue"}`

adminPassword _(simple authServiceType only)_
---
 __\<String\>__ - User Password
 
EX `"adminPassword": "adminPassword123!"`

 adminMetadata _(simple authServiceType only)_ 
---
 __\<Object\>__ - Admin Metadata
 
EX `"adminMetadata": { "isAdmin":true, color:"purple"}`

whitelist (all authServiceTypes ) [required]
---
 __\<Array\>__ - Array of Strings where the strings are domains to whitelist. Whitelisted domains is where the fgrauthservice expects requests to originate from.
 NOTE: to allow for all origins add `["*"]` as the whitelist value.
 
EX `"whitelist":["http://localhost:4000"]`

<!-- Then (assuming you have the docker client and daemon) and in the same directory as your config.json file, run... 

`docker run -it -v ${pwd}/config.json:/app/config.json dariv94/fgrauthservice npm run config`

(replace FGRCONFIG value here with the output from the above cmd) 
Then with the env file, run `docker run --rm -p 4000:4000 --env-file .env dariv94/fgrauthservice`
```
PORT=4000
NODE_ENV=development
FGRCONFIG=eyJhdXRoU2VydmljZVR5cGUiOiJzaW1wbGUiLCJ1c2VyUGFzc3dvcmQiOiJQYXNzd29yZDEiLCJ1c2VyTWV0YWRhdGEiOnsiaXNBZG1pbiI6ZmFsc2UsImNvbG9yIjoiYmx1ZSJ9LCJhZG1pblBhc3N3b3JkIjoiYWRtaW4xIiwiYWRtaW5NZXRhZGF0YSI6eyJpc0FkbWluIjp0cnVlLCJjb2xvciI6InB1cnBsZSJ9LCJ3aGl0ZWxpc3QiOlsiaHR0cDovL2xvY2FsaG9zdDo0MDAwIl19
``` -->

# Endpoints

authServiceType:simple  Endpoints
---

/auth/login
----
- Endpoint: `/auth/login`
- Method: `POST`
- Request Body: `{"password":"<PASSWORD_HERE>"}`
- 200 Return Body: `{"token":"<JWT_TOKEN_WILL_BE_HERE>"}` (Content-Type: application/json)
- 400 Retrun body: `Invalid Password`  (Content-Type: text/html)

<!-- Curl example -->
<!-- Fetch Example...
```
  const response = fetch('http://localhost:4000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password:"mypassword"})
  });
  console.log(response.body)
``` -->

/auth
----
- Endpoint: `/auth`
- Method: `POST`
- Request Header: `a-auth-token:<JWT_TOKEN_WILL_BE_HERE>`
- Request Body: `none`
- 400 Retrun body: `Invalid Password`  (Content-Type: text/html)

<!-- Fetch Example...
```
  const response = fetch('http://localhost:4000/auth', {
    method: 'POST',
    headers: {
      'x-auth-token': 'application/json'
    },
  });
  console.log(response.body)
``` -->


