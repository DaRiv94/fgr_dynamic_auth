//Testing Libaries
var httpMocks = require('node-mocks-http');
var sinon = require('sinon');

//Middleware to test
const auth = require('./auth');

//utility libiaries
const jwt = require("jsonwebtoken");

//config
config = { 
    authServiceType: "simple", 
    userPassword: "Password123!",
    adminPassword: "adminPassword123!",
}


describe("Auth middleware, authServiceType=simple", () => {

    test(`Test auth middleware success userPassword`, async () => {

        token= jwt.sign({ isAdmin:false}, config.userPassword);
        var request  = httpMocks.createRequest({
            headers:{
                "x-auth-token":token
            }
        });
    
        var response = httpMocks.createResponse();
        var next = sinon.fake();

        const res = await auth(request, response, next)
        // console.log("res: ",JSON.stringify(res))
        // console.log("request: ",JSON.stringify(response))
        // console.log("response: ",JSON.stringify(response))
        expect(next.calledOnce).toBe(true);
        
      });

});
