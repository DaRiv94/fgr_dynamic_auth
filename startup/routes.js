//General

const auth_routes = require('../routes/auth');
console.log("ROUTES AFTER AUTH")
config = require('../read_config');

// //finite routes
// const register = require('../routes/finite/register')


module.exports = (app) => {

    // //routes
    // app.get('/',(req,res)=>{
    //     res.send("This is the root page");
    // })
    // console.log("START UP ROUTES")
    // app.use('/auth', auth_routes);

    if (config.authServiceType == "simple") {
        //routes
        app.get('/', (req, res) => {
            res.send("This is the root page");
        })
        console.log("START UP ROUTES")
        app.use('/auth', auth_routes);
    }
    

    if (config.authServiceType == "finite") {
        //finite routes
        const register = require('../routes/finite/register')

        //routes
        app.get('/', (req, res) => {
            res.send("This is the root page");
        })
        console.log("START UP ROUTES")
        app.use('/auth', auth_routes);

        app.use('/register', register);
    }
}