config = require('../read_config');
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

router.post("/login", (req, res) => {
    if (req.body && req.body.password) {

        if (config.authServiceType == "simple") {
            let { simpleAuthServiceLogin } = require("./routeHelpers/simpleAuthService/simpleAuthServiceLogin");
            //With the simple service type this is at least one UserAccount password,
            return simpleAuthServiceLogin(req, res, req.body.password)
        } else if (config.authServiceType == "finite") {
            let { postLoginFiniteAuthServiceType } = require("./routeHelpers/finiteAuthService/finiteAuthServiceLogin");
            console.log("finite....")
            //Should add validate based on type of Auth service type
            if (req.body.email) {
                return postLoginFiniteAuthServiceType(req, res, req.body.email, req.body.password)
            } else {
                res.status(400).send("Please send email in body");
            }
        }
    } else {
        res.status(400).send("Please send password in body");
    }
});

//uses middleware to check password
router.post('/', auth, async (req, res) => {
    // use this for admins
    //if(!req.user.isAdmin) return res.status(403).send('You are not authorized to perform this action');
    return res.send(req.user)
});

module.exports = router;

