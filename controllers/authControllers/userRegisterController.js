const express = require("express");
const User = require("../../models/UserModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const Token = require("../../models/TokenModel");
const sendEmail = require("../../utils/sendEmail")
const crypto = require("crypto");
const dotenv = require('dotenv');

dotenv.config();

const userRegisterController = async (req, res) => {
    // Extract data from the request
    const {
        firstName, lastName, email, password, dob, phoneNumber, country, gender, interests, hobbies, skills, experience,
    } = req.body;
    
    let profileImage = null 
    if (req.file.filename) {
        profileImage = req.file.filename
    }

    // chacking the validations results
    let success = false
    // if there are errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    // controller logic
    try {
        // check whether the user with this email exists already
        let user = await User.findOne({ email: email });
        if (user) {
            // You may want to handle this case differently, e.g., by sending a different response.
            return res
                .status(400)
                .json({ success, error: "user with this email already exists" });
        }

        // hashing the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);
        // Create a new User instance with the extracted data
        const newUser = new User({
            firstName, lastName, email, password: hashedPassword, dob, phoneNumber, country, gender,
            interests, hobbies, skills, experience, profileImage,
        });
        // Save the new user to the database
        await newUser.save();

        // sending email
        // saving the new token
        const token = await new Token({
            userId: newUser._id,
            token: crypto.randomBytes(32).toString("hex")
        }).save();
        // making url
        const url = `${process.env.NODE_BASE_URL}${process.env.APIV1}/users/${newUser._id}/verify/${token.token}`
        // sending email
        await sendEmail(newUser.email, 'Verify Email', url);

        // Respond with a success message
        res.status(201).json({ message: "User registered successfully, Please verify your email to login", user: newUser });
    } catch (error) {
        // Handle any errors that occur during user registration
        res.status(500).json({ error: error.message });
    }
};

module.exports = userRegisterController;