
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

console.log("docker run -it -v ${pwd}/config.json:/app/config.json dariv94/fgrauthservice npm run config")
console.log()
console.log("docker run --rm -p 4000:4000 --env-file .env dariv94/fgrauthservice")
console.log()
