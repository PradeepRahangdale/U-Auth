const express = require("express");
const bodyParser = require('body-parser');
const Router = express.Router();
const signup = require('./signup.module')

const app = express();

// Middleware to parse json requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// signup API
Router.post('/signup',async(req,res)=>{
    const{ First_name, Last_name,Email,User_name,Password} = req.body;
    try{
        if(!First_name|| !Last_name || !Email || !User_name || !Password){
            return res.status(400).json({message: 'all  feilds are required' })

        }
        const newUser = new signup(
        {
            First_name,
            Last_name,
            Email,
            User_name,
            Password
        });
        const result = await newUser.save();
        res.json({message : 'signup succesful'});
    } catch (err){
        console.error('Error saying user to database:', err);
        res.status(500).json({ massage:' Error saving user to databaser', error: err});
    }

});

module.exports = Router;


