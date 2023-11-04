const express = require("express");
const Note = require("../../models/NoteModel");

const getNoteByIdController = async (req, res) => {
    // fetch all notes
    try {
        const noteId = req.params.id;
        const noteById = await Note.findById(noteId);
        res.status(200).json(noteById);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}
module.exports = getNoteByIdController