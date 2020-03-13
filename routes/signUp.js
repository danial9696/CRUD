const express = require('express');
const app = express();
const User = require('../model/User');
const multer = require('multer');
const storage = require('../storage/storage');
const upload = multer({ storage: storage })

// Sign up User

let type = upload.single('i.jpg');

app.post('/', type , async (req, res) => {
    
    const img = req.file;
    console.log(img);

    try {
        let newUser = await new User(req.headers).save();
        let err = newUser.joiValidate(newUser);
        if (err) throw err;
        newUser.save();
        if(img) {
            res.json({
                status: 200,
                msg: 'You have Succesffuly Signed up',
                data: {newUser}
            });
        } 
        else {
            console.log('No file Received');
        }
        
        
    }
    catch(err) {
        res.send(err);
    }
    
});

  

module.exports = app;