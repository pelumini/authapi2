const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken');

const User = require('../models/User');
const passportConfig = require('../auth/passport');


// REGISTER A NEW USER
router.post('/signup', async (req, res) => {
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

// GET ALL USERS
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;