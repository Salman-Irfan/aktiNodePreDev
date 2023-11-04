const express = require("express");
const User = require("../../models/UserModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");



const userRegisterController = async (req, res) => {
    // Extract data from the request
    const {
        firstName, lastName, email, password, dob, phoneNumber, country, gender, interests, hobbies, skills, experience,
    } = req.body;
    const profileImage = req.file.filename

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

        // Respond with a success message
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        // Handle any errors that occur during user registration
        res.status(500).json({ error: error.message });
    }
};

module.exports = userRegisterController;