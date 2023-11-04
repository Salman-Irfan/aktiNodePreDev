const express = require("express");
const Note = require("../../models/NoteModel");

const getNotesController = async (req, res) => {
    try {
        const notes = await Note.find().populate({
            path: 'userId',
            select: 'firstName email profileImage'
        });

        notes.forEach(note => {
            const user = note.userId;
            if (user.profileImage && !user.profileImage.startsWith('http')) {
                user.profileImage = `${req.protocol}://${req.get('host')}/profileImages/${user.profileImage}`;
            }
        });

        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = getNotesController;