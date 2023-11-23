const express = require('express');
const User = require('../../models/UserModel')
const Note = require('../../models/NoteModel')
const getUserNotesController = async (req, res) => {
    try {
        // logged in user
        let userEmail = req.user.email
        let user = await User.findOne({ email: userEmail })
        let userId = user._id
        // Find all notes of the logged-in user
        const userNotes = await Note.find({ userId }).populate({
            path: 'userId',
            select: 'firstName email profileImage'
        });;
        userNotes.forEach(note => {
            const user = note.userId;
            if (user.profileImage && !user.profileImage.startsWith('http')) {
                user.profileImage = `${req.protocol}://${req.get('host')}/profileImages/${user.profileImage}`;
            }
        });
        return res.json(userNotes);
    } catch (error) {
        return res.json({
            success: false,
            error: error.message
        })
    }
}
module.exports = getUserNotesController