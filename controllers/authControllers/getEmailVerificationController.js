const express = require('express');
const User = require('../../models/UserModel');
const Token = require('../../models/TokenModel');

const getEmailVerificationController = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });

        // if user is not found return false
        if (!user) {
            return res.json({
                message: 'Invalid Link',
            });
        }

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });

        // if token is not found return false
        if (!token) {
            return res.json({
                message: 'Invalid Token',
            });
        }

        // if success, update the verified field of user
        await User.updateOne(
            { _id: user._id },
            { $set: { verified: true } }
        );

        // Remove the token from the database
        await Token.deleteOne({ _id: token._id });

        return res.json({
            success: true,
            message: 'Email verified successfully',
        });
    } catch (error) {
        console.log(error);
        return res.json({ error: error.message });
    }
};

module.exports = getEmailVerificationController;
