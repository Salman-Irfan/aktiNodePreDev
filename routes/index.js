const express = require('express')
const router = express.Router()

// Import routes modules here
const notesRoutes = require("./notesRoutes/notesRoute")
const authRoutes = require("./authRoutes/authRoutes")
// Define base routes for your modules
router.use('/api/v1/', notesRoutes);
router.use('/api/v1/', authRoutes);

module.exports = router;