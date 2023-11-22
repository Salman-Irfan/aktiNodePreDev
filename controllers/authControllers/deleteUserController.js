const express = require('express')
const User = require("../../models/UserModel");

const deleteUserController = async (req, res) => {
    try {
        const userId = req.params.id; // Get the user ID from the route parameter

        // Check if the note with the given ID exists
        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // new: true means if there is new content, then it will be created
        const deletedUser = await User.findByIdAndDelete(userId);
        return res.json({
            "Success": 'user has been deleted',
            deletedUser
        });

    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            error: error.message
        })
    }
}
module.exports = deleteUserController