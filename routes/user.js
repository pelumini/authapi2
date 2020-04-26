const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken');

const User = require('../models/User');
const passportConfig = require('../auth/passport');

const signToken = userID => {
    return JWT.sign({
        iss: "PelumiBodunwa",
        sub: userID
    }, "PelumiBodunwa", {expiresIn: "1h"});
}


// REGISTER A NEW USER
router.post('/signup', (req, res) => {
    const { firstname, middlename, lastname, email, role, photo, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if(err)
            res.status(500).json({ message: { msgBody: "Error has occured", msgError: true }});
        if(user)
            res.status(400).json({ message: { msgBody: "Email is already in use", msgError: true }});
        else {
            const newUser = new User({firstname, middlename, lastname, email, role, photo, password});
            newUser.save(err => {
                if(err)
                    res.status(500).json({ message: { msgBody: "Error has occured", msgError: true }});
                else 
                    res.status(201).json({ message: { msgBody: "Account successfully created", msgError: false }});
            })
        }
    })
  
});


// LOGIN A REGISTERED USER
router.post('/login', passport.authenticate('local', {session:false}), (req, res) => {
    if(req.isAuthenticated()){
        const { _id, email, role } = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, { httpOnly: true, sameSite: true});
        res.status(200).json({ isAuthenticated: true, user: {email, role}});
    } 
});



module.exports = router;