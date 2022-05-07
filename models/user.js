import mongoose from 'mongoose'
import crypto from 'crypto'
const { v1: uuidv1 } = require('uuid');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxLength: 32,
        trim: true
    },
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 32
    },
    avatar: {
        type: String
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    about: {
        type: String,
        trim: true
    },
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    },

}, { timestamps: true })


userSchema.virtual('password').set(function (password) {
    this.salt = uuidv1();
    this.hashed_password = this.encrytPassword(password);
})

userSchema.methods = {
    authenticate: function (plainText) {
        return this.encrytPassword(plainText) === this.hashed_password;
    },
    encrytPassword: function (password) {
        if (!password) return '';
        try {
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
        } catch (error) {
            return '';
        }
    }
}
module.exports = mongoose.model('User', userSchema);