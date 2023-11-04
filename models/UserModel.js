const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
        unique: true,
    },
    password: {
        type: String,
        required: false,
    },
    dob: {
        type: Date,
        required: false,
    },
    phoneNumber: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    interests: {
        type: Array,
        default: []
    },
    hobbies: {
        type: Array,
        default: []
    },
    skills: {
        type: Array,
        default: []
    },
    experience: {
        type: Number,
        required: false,
    },
    profileImage: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin"],
        default: "user",
    },
},
    {
        timestamps: true
    });

module.exports = mongoose.model('User', userSchema);