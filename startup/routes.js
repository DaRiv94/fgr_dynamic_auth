//General
const auth_routes = require('../routes/auth');
config = require('../config');

//finite routes
const register = require('../routes/finite/register')


module.exports=(app)=>{

    //routes
    app.get('/',(req,res)=>{
        res.send("This is the root page");
    })
    console.log("START UP ROUTES")
    app.use('/auth', auth_routes);

    if(config.authServiceType=="finite"){
        app.use('/register', register);
    }
}