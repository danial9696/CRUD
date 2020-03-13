const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const User = require('../model/User');

app.post('/', async (req , res) => {

    try {
        const {email} = req.headers;
        // console.log(email);
    
        const user = await User.findOne({email});
        
        // console.log(user);
        // await user.updateOne(email, { $set: {tokens: null} });
        
        if(user) {
            // await User.findOneAndUpdate(email, { $set: {tokens: null} });
            const user = await User.findOneAndUpdate(email, { $set: {tokens: null} });
            res.json({
                msg: 'Logged Out',
                data: user
            })
        } 
        else {
            
            res.json({
                staus: 500,
                msg: 'User not found'
                
            });
            throw new Error('User not found');
        }
    
        
    }

    catch(err) {
        console.log(err);
    }
   

});

module.exports = app;