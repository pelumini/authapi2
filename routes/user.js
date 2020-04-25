const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true, 
        trim: true, 
        lowercase: true,
        unique: true
    }, 
    middlename: {
        type: String,
        required: true, 
        trim: true, 
        lowercase: true,
        unique: true
    },
    lastname: {
        type: String,
        required: true, 
        trim: true, 
        lowercase: true,
        unique: true
    },
    email: {
        type: String,
        required: true, 
        trim: true, 
        lowercase: true,
        unique: true
    },            
    password: {
        type: String,
        required: true,
        minLength: 7
    }    

})