const express = require("express");
const Note = require("../../models/NoteModel");
const { validationResult } = require("express-validator");
const User = require("../../models/UserModel");

const createNotesController = async (req, res) => {
    
    const errors = validationResult(req);
    // yani k agr error ata hai, mtlab  title ya desc blank hai
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // // creating note
    try {
        let userEmail = req.user.email
        let user = await User.findOne({ email: userEmail})
        let userId = user._id
        const note = new Note({
            title: req.body.title,
            description: req.body.description,
            tags: req.body.tags,
            userId: userId
        });
        await note.save(); // command to save in mongo db
        return res.status(201).json(note);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
// export this controller

module.exports = createNotesController;