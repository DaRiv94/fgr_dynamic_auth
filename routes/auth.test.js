//Express app
const app = require("../app");

//route methods to test
let {postLoginSimpleAuthServiceType} = require("./simpleAuthServiceLogin");

//Testing Libaries
const request = require("supertest");
const jwt = require("jsonwebtoken");
const httpMocks = require('node-mocks-http');

//Configuration
config = { 
    authServiceType: "simple", 
    userPassword: "Password123!wwxxzz",
    adminPassword: "adminPassword123!",
    whitelist:["http://localhost:4000"]
}

describe("Dynamic Tests /auth/login route", () => {
    authLoginPasswords=["password1", "12345abcde", "@&#^$*@YGS"]
    for (index in authLoginPasswords){
        testPassword(authLoginPasswords[index])
      }

  //Dynamic Tests /auth/login route
  function testPassword(password){
    test(`Test /auth/login with password: ${password}`, async () => {
        config.userPassword=password
        const response = await request(app).post('/auth/login')
        .send({password: password})
        .set('Accept', 'application/json');
        expect(response.body).toHaveProperty('token');
        expect(typeof response.body.token).toBe('string');
        expect(response.statusCode).toBe(200);
      });
  }
});

describe("Static Tests postLoginSimpleAuthServiceType", () => {

    test(`User Success no extra metadata`, async () => {

        config.userPassword="Password123!"
        var request  = httpMocks.createRequest();
        var response = httpMocks.createResponse();
        let res = await postLoginSimpleAuthServiceType(request, response, "Password123!")
        // console.log("res._getData: ", JSON.stringify(res._getData()))
        expect(res.statusCode).toBe(200);
        expect(res._getData()).toHaveProperty('token');
        expect(typeof res._getData().token).toBe('string');

        const user = jwt.verify(res._getData().token, config.userPassword);
        expect(user).toHaveProperty('isAdmin');
        expect(user.isAdmin).toBe(false);
        expect(user).toHaveProperty('iat');
        // expect(res._getData()).toBe("Invalid token");
      });

      test(`User Success With extra metadata`, async () => {

        config.userPassword="Password123!"
        config.userMetadata={"isAdmin":false, color:"blue"}
        var request  = httpMocks.createRequest();
        var response = httpMocks.createResponse();
        let res = await postLoginSimpleAuthServiceType(request, response, "Password123!")
        // console.log("res._getData: ", JSON.stringify(res._getData()))
        expect(res.statusCode).toBe(200);
        expect(res._getData()).toHaveProperty('token');
        expect(typeof res._getData().token).toBe('string');

        const user = jwt.verify(res._getData().token, config.userPassword);
        expect(user).toHaveProperty('iat');
        expect(user).toHaveProperty('isAdmin');
        expect(user.isAdmin).toBe(false);
        expect(user).toHaveProperty('color');
        expect(user.color).toBe('blue');
        
        // expect(res._getData()).toBe("Invalid token");
      });


});

describe("Static Tests /auth route for authServceType=simple", () => {


  test(`Test /auth user success`, async () => {
      config.userPassword="Password123!"
      token= jwt.sign({ isAdmin:false}, config.userPassword);
      const response = await request(app).post('/auth')
      .set('x-auth-token', token);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('isAdmin');
      expect(response.body.isAdmin).toBe(false);
      expect(response.body).toHaveProperty('iat');
      
    });

    test(`Test /auth admin success`, async () => {
      config.adminPassword="adminPassword123!"
      token= jwt.sign({ isAdmin:true}, config.adminPassword);
      const response = await request(app).post('/auth')
      .set('x-auth-token', token);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('isAdmin');
      expect(response.body.isAdmin).toBe(true);
      expect(response.body).toHaveProperty('iat');
    });

    test(`Test /auth no admin failure`, async () => {
      config.adminPassword=null
      token= jwt.sign({ isAdmin:false}, "WrongPassword");
      const response = await request(app).post('/auth')
      .set('x-auth-token', token);

      expect(response.statusCode).toBe(400);
      expect(response).toHaveProperty('text');
      expect(response.text).toBe("Invalid token");
    });

    
    test(`Test /auth user failure`, async () => {
      config.adminPassword="adminPassword"
      token= jwt.sign({ isAdmin:false}, "WrongPassword");
      const response = await request(app).post('/auth')
      .set('x-auth-token', token);

      expect(response.statusCode).toBe(400);
      expect(response).toHaveProperty('text');
      expect(response.text).toBe("Invalid token");
    });

    test(`Test /auth failure no token`, async () => {
      config.userPassword="Password123!"
      const response = await request(app).post('/auth')
  
      expect(response.statusCode).toBe(401);
      expect(response).toHaveProperty('text');
      expect(response.text).toBe("Unauthorized, no auth token provided");
      
    });

});