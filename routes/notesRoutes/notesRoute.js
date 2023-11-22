const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const createNotesController = require('../../controllers/notesControllers/createNotesController');
const getNotesController = require('../../controllers/notesControllers/getNotesController');
const updateNoteController = require('../../controllers/notesControllers/updateNoteController');
const deleteNoteController = require('../../controllers/notesControllers/deleteNoteController');
const getNoteByIdController = require('../../controllers/notesControllers/getNoteByIdController');
const requireSignIn = require('../../middlewares/authMiddleware');

// create note route
router.post("/notes",
    requireSignIn,
    [
        body('title').isLength({ min: 1 }),
        body('description').isLength({ min: 1 })
    ],
    createNotesController
);

// get all notes
router.get("/notes", getNotesController);

// Update a note
router.put("/notes/:id",
    requireSignIn,
    [
        body('title').isLength({ min: 1 }),
        body('description').isLength({ min: 1 })
    ],
    updateNoteController
);

// Delete a note
router.delete("/notes/:id", requireSignIn, deleteNoteController);

// get note by id
router.get("/note/:id", getNoteByIdController);

module.exports = router;
