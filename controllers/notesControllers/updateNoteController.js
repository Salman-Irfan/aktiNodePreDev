const express = require("express");
const Note = require("../../models/NoteModel");
const { validationResult } = require("express-validator");
const User = require("../../models/UserModel");

const updateNoteController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // const noteId = req.params.id; // Assuming you pass the note ID in the route parameter
        // // Check if the note with the given ID exists
        // const existingNote = await Note.findById(noteId);

        // if (!existingNote) {
        //     return res.status(404).json({ error: "Note not found" });
        // }
        // // Update the note with the provided data
        // existingNote.title = req.body.title;
        // existingNote.description = req.body.description;
        // existingNote.tags = req.body.tags;

        // // Save the updated note
        // await existingNote.save();

        // return res.status(200).json(existingNote);
        const noteId = req.params.id; // Assuming you pass the note ID in the route parameter
        // Find the note by ID
        const existingNote = await Note.findById(noteId);

        if (!existingNote) {
            return res.status(404).json({ error: "Note not found" });
        }
        // login user details
        const loggedInUserEmail = req.user.email
        const loggedInUser = await User.find({ email: loggedInUserEmail})
        const loggedInUserId= loggedInUser._id

        // Check if the user making the request is the owner of the note
        if (existingNote.userId !== loggedInUserId) {
            return res.json({ error: "You are not authorized to edit this note" });
        }
        // Update the note with the provided data using findByIdAndUpdate
        const updatedNote = await Note.findByIdAndUpdate(
            noteId,
            {
                title: req.body.title,
                description: req.body.description,
                tags: req.body.tags
            },
            { new: true } // { new: true } returns the updated document
        );

        if (!updatedNote) {
            return res.status(404).json({ error: "Note not found" });
        }
        return res.status(200).json(updatedNote);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = updateNoteController;
