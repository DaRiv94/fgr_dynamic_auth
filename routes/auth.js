config = require('../read_config');
const express = require('express');
const router = express.Router();

console.log("CHECK ME HERE1")
if (config.authServiceType == "simple") {
    console.log("CHECK ME HERE1.5")
    let { postLoginSimpleAuthServiceType } = require("./routeHelpers/simpleAuthService/simpleAuthServiceLogin");

    const auth = require('../middleware/auth');

    //Should add validate based on type of Auth service type
    // Exmaple (Check for password with simple)
    // Example (Check for email and password with finite)
    console.log("IN AUTH /login")
    router.post("/login", (req, res) => {
        if (req.body && req.body.password) {
            return postLoginSimpleAuthServiceType(req, res, req.body.password)

            // sentPassword = req.body.password

            // if (config.authServiceType == "simple") {
            //     //With the simple service type this is at least one UserAccount password,
            //     return postLoginSimpleAuthServiceType(req, res, sentPassword)
            // } else if (config.authServiceType == "finite") {
            //     console.log("finite....")
            //     //Should add validate based on type of Auth service type
            //     if (req.body.email) {
            //         return postLoginFiniteAuthServiceType(req, res, req.body.email, req.body.password)
            //     } else {
            //         res.status(400).send("Please send email in body");
            //     }

            // }

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

}
console.log("CHECK ME HERE2")
if (config.authServiceType == "finite") {
    console.log("CHECK ME HERE2.5")
    let { postLoginFiniteAuthServiceType } = require("./routeHelpers/finiteAuthService/finiteAuthServiceLogin");

    const auth = require('../middleware/auth');



    //Should add validate based on type of Auth service type
    // Exmaple (Check for password with simple)
    // Example (Check for email and password with finite)
    console.log("IN AUTH /login")
    router.post("/login", (req, res) => {
        if (req.body && req.body.password) {
            sentPassword = req.body.password
            if (config.authServiceType == "simple") {
                //With the simple service type this is at least one UserAccount password,
                return postLoginSimpleAuthServiceType(req, res, sentPassword)
            } else if (config.authServiceType == "finite") {
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

}
console.log("CHECK ME HERE3")
module.exports = router;

