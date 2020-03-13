const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const User = require('../model/User');


// Login User
app.post('/',  async (req, res) => {

    try {
        const { email, password } = req.headers;
        const user = await User.findByCredentials(email,password);

        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'});
        }
        
        const token = await user.generateAuthToken();
        // console.log(token);

        res.json({
            status: 200,
            msg : 'Logged In',
            data: user
            // myToken: token
        });

    } 
    catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
});

module.exports = app;