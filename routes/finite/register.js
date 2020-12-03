const express = require('express');
const router = express.Router();
config = require('../../read_config');
let validateEmail = require('../routeHelpers/finiteAuthService/validateEmail')
let bcrypt = require('bcryptjs');
// const { config } = require('dotenv/types');

let User
if (config.database_type == "POSTGRES") {
    User = require('../../databases/postgres/models/User')
}

//NOTE: currently no unit testing is setup for register endpoint!


// /register route
router.post("/", async (req, res) => {
    if (req.body && req.body.email && req.body.password && req.body.password2) {
        

        if (req.body.password !== req.body.password2) {
            return res.status(400).send("Passwords do not match");
        }

        if (!validateEmail(req.body.email)) {
            return res.status(400).send("Invalid email");
        }

        // I will want to create a repository functions for when I implement other databases
        // Then I will do simple calls like const user = await getUserByEmail(email)
        const user = await User.findOne({
            where: {
                email: req.body.email.toLowerCase()
            }
        })
        if (user) {
            return res.status(400).send("That email is already in use");
        }

        if(req.body.admin_creation_secret){
            if(req.body.admin_creation_secret != config.admin_creation_secret){
                return res.status(400).json({detail:"Invalid admin_creation_secret"});
            }
            if(config.admin_account_limit){
                const users = await User.findAll(
                    {
                        where: {
                            is_admin: true
                        }
                    })
                // console.log(users)
                if (config.admin_account_limit <= users.length) {
                    return res.status(400).send("The Admin User Limit has been reached");
                }
            }
        }else{
            if (config.user_account_limit) {
                const users = await User.findAll(
                    {
                        where: {
                            is_admin: false
                        }
                    })
                // console.log(users)
                if (config.user_account_limit <= users.length) {
                    return res.status(400).send("The User Limit has been reached");
                }
            }
        }

        try {
            var salt = bcrypt.genSaltSync(10);
            var password_hash = bcrypt.hashSync(req.body.password, salt);


            
            const newUser = await User.create({ email: req.body.email.toLowerCase(), 
                password_hash: password_hash, 
                email_verified: false, 
                is_admin: req.body.admin_creation_secret ? true : false });

            newuserData = {
                is_admin: newUser.is_admin,
                email: newUser.email,
                email_verified: newUser.email_verified,
                id: newUser.id,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
            }

            return res.json({ "newUser": newuserData })
        } catch (error) {
            console.error(error)
        }

    } else {
        return res.status(400).send("Please send register info in body");
    }
});

module.exports = router;

