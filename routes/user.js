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

// LOGOUT A LOGIN USER
router.get('/logout', passport.authenticate('jwt', {session:false}), (req, res) => {
    res.clearCookie('access_token');
    res.json({ user: { email: "", role: ""}, success: true });
});

// ADMIN PANEL
router.get('/admin', passport.authenticate('jwt', {session:false}), (req, res) => {
    if(req.user.role === 'admin'){
        res.status(200).json({ message: { msgBody: "You are an admin", msgError: false }});
    } else {
        res.status(403).json({ message: { msgBody: "You are not an admin", msgError: true }});
    }
});

// CONTINOUS AUTHENTICATION
router.get('/authenticated', passport.authenticate('jwt', {session:false}), (req, res) => {
    const { email, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: {email, role}});
});



module.exports = router;