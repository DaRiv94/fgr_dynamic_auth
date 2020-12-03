//General

const auth_routes = require('../routes/auth');
config = require('../read_config');

module.exports = (app) => {

    //routes
    app.get('/', (req, res) => {
        res.send("This is the root page");
    })

    app.get('/healthy', (req, res) => {
        res.status(200).json({ detail: "healthy" });
    })

    app.use('/auth', auth_routes);

    if (config.authServiceType == "finite") {
        //finite routes
        const register = require('../routes/finite/register')

        app.use('/register', register);
    }
}