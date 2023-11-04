const express = require("express");
const Note = require("../../models/NoteModel");

const deleteNoteController = async (req, res) => {
    try {
        const noteId = req.params.id; // Get the note ID from the route parameter

        // Check if the note with the given ID exists
        const existingNote = await Note.findById(noteId);

        if (!existingNote) {
            return res.status(404).json({ error: "Note not found" });
        }

        // new: true means if there is new content, then it will be created
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        return res.json({
            "Success": 'note has been deleted',
            deletedNote});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = deleteNoteController;
