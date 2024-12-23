const { Schema, model } = require('mongoose')
var validator = require('validator');
const userSchema = new Schema({
    name: {
        type: String,
        require: [true, 'name is reuire']
    },
    email: {
        type: String,
        require: [true, 'email is reuire'],
        validate: validator.isEmail
    },
    password: {
        type: String,
        uniqute: true,
        require: [true, 'password is reuire'],
        validate: validator.isStrongPassword,
        select: true
    },
    role: {
        type: String,
        role: ['admin', 'user'],
        default: 'user'
    },
    location: {
        type: String,
        default: 'india'
    }
}, { timestamps: true })
module.exports = model('User', userSchema);