# Welcome to the FGR Dynamic auth service!


## What is this project?

FGR Dynamic Auth Service was created so that I ([Frankie Riviera](https://frankieriviera.com)) would be able to quickly spin up an authentication and authorization service for my personal projects, while also being dynamic in that it can be configured quickly and easily for different use cases.

However I have intended on structuring this readme in such a way that anyone could pull the Docker image and plug and play with this auth microservice. Hopfully it saves you time from rewriting auth logic the way it has for me.

### The image can be found on DockerHub [here](https://hub.docker.com/repository/docker/dariv94/fgrauthservice)
Pull down Image
```
docker pull dariv94/fgrauthservice
```

# QuickStart

### Prerequisites
- Docker - find intructions on installing docker [here](https://docs.docker.com/get-docker/)
- A learners mindset. - I live by the phrase *"Everything is hard until you know it"*

### 1. Create config.json file with configuration data. (Find documentation and examples on config.json file below)
### 2. In the same directory as your config.json file, run the following...  
**Powershell** 
```
docker run --rm -v ${pwd}/config.json:/app/config.json dariv94/fgrauthservice npm run config
```
 **Bash/Zsh**
 ```
 docker run --rm -v $(pwd)/config.json:/app/config.json dariv94/fgrauthservice npm run config
 ```
 
 This should output your *.env* file which should contain your FGRCONFIG base64 encoded Key value pair, along with the PORT and NODE_ENV key value pairs if they were specified in your config.json.
 *NOTE*: If there was already an existing *.env* file, this command will output *0_copy.env* and then if that exists it will put put *1_copy.env* and so on..
 
 If you want to want to overwrite an existing .env file with a new .env file, you can add the argument `overwrite` to the create config commmand.

 ### 3. Then start the auth microservice!
```
docker run --rm -p 4000:4000 --from-env .env dariv94/fgrauthservice
```

Assuming your auth service was configured to use port 4000 and your configuration didnt have an error you should now be able to send a GET request to http://localhost:4000/healthy and get a HTTP 200 OK response.

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


[required] - means the specifc authServiceType *must* include the field

[optional] - means the specifc authServiceType *may* include the field

[ignored] - means the specifc authServiceType disregards the field

---
authServiceType _(ALL authServiceType [required] )_
---

__"simple"__ - One user account, one Admin account

__"finite"__ - Finite user accounts, finite admin accounts

<!-- Future feature
__"multi"__ - Many user accounts, many admin accounts -->

EX: `"authServiceType": "simple"`

---
userPassword _(simple authServiceType [required], finite authServiceType [ignored], )_ 
---
 __\<String\>__ - User Password
 
EX `"userPassword": "Password123!"`

---
 userMetadata _(simple authServiceType [required], finite authServiceType [ignored], )_  
---
 __\<Object\>__ - User Metadata
 
EX `"userMetadata": { "isAdmin":false, "color":"blue"}`

---
adminPassword _(simple authServiceType [required], finite authServiceType [ignored], )_ 
---
 __\<String\>__ - User Password
 
EX `"adminPassword": "adminPassword123!"`

---
 adminMetadata _(simple authServiceType [required], finite authServiceType [ignored], )_  
---
 __\<Object\>__ - Admin Metadata
 
EX `"adminMetadata": { "isAdmin":false, "color":"blue"}`

---
whitelist _(ALL authServiceType [required] )_
---
 __\<Array\>__ - Array of Strings where the strings are domains to whitelist. Whitelisted domains is where the fgrauthservice expects requests to originate from.
 NOTE: to allow for all origins add `["*"]` as the whitelist value.
 
EX `"whitelist":["http://localhost:4000"]`

---
port _(ALL authServiceType [optional] )_
---
 __\<String\>__ - Custom port number for fgrauthservice to run on. 
 
 *NOTE* that the default port is *4000*. 
 
 *NOTE2* that this value will be added to your env file as key value pair separate from the FGRCONFIG env var.
 
EX `"port":"4000"`

---
node_env _(ALL authServiceType [optional] )_
---
 __\<String\>__ - Environment setting

 *NOTE* that the default is *production*. 

  *NOTE2* that this value will be added to your env file as key value pair separate from the FGRCONFIG env var.
 
EX `"node_env":"development"`

---
database_type _(simple authServiceType [ignored], finite authServiceType [required], )_
---
 __\<String\>__ - String representing your type of database, currently the only two avilable options are `MONGODB` and `POSTGRES`
 
EX `"database_type":"POSTGRES"`

---
database_connectionstring _(simple authServiceType [ignored], finite authServiceType [required], )_
---
 __\<String\>__ - Connection string for database
 
EX `"database_connectionstring":"postgres://postgres:postgres@localhost:5432/local_database"`

---
database_connectionstring_dev _(simple authServiceType [ignored], finite authServiceType [optional], )_
---
 __\<String\>__ - Connection string for database, *NOTE*: that if this value is present, its value will only be used if if **node_env** is set to **development**
 
EX `"database_connectionstring_dev":"postgres://postgres:postgres@localhost:5432/local_database_dev""`

---
admin_creation_secret _(simple authServiceType [ignored], finite authServiceType [required], )_
---
 __\<String\>__ - Secret passed in body of the */auth/register* endpoint to register a new admin user
 
EX `"admin_creation_secret":"somesupersecretsecret",`

---
jwtsecret _(simple authServiceType [ignored], finite authServiceType [required], )_
---
 __\<String\>__ - Secret used when creating and validating Json Web Tokens
 
EX `"jwtsecret":"somesupersecretsecret"`

---
user_account_limit _(simple authServiceType [ignored], finite authServiceType [required], )_
---
 __\<Integer\>__ - number of finite user accounts.
 
EX `"user_account_limit":  3`

---
admin_account_limit _(simple authServiceType [ignored], finite authServiceType [required], )_
---
 __\<Integer\>__ - number of finite admin user accounts.
 
EX `"admin_account_limit":  1`



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

---

[<img src="./images/FGR_Transparent.png" width="100" />](https://frankieriviera.com)

This is an FGR project.

Check out my [Online Portfolio](https://frankieriviera.com/portfolio) to see some of my other work!

