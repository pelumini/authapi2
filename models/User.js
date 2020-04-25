const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true, trim: true, lowercase: true}, 
    middlename: { type: String, trim: true, lowercase: true },
    lastname: { type: String, required: true, trim: true, lowercase: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },       
    photo: { type: String, data: Buffer },      
    role: { type: String, required: true, enum: ['admin', 'user'] }, 
    password: { type: String, required: true, minLength: 7 }    
}, {timestamps: true});

// Hash the password before saving the user model
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) 
        return next();
    await bcrypt.hash(this.password, 10, (err, passwordHash) => {
        if(err)
            return next();
        this.password = passwordHash;
        next();
    });
});

userSchema.methods.comparePassword = function(password, cb){
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if(err)
            return cb(err)
        else {
            if(!isMatch)
                return cb(null, isMatch);
            return cb(null, this);
        }
    });
}

module.exports = mongoose.model('User', userSchema);