const express = require("express");
const connectToMongodb = require('./config/db');
const cors = require("cors");
connectToMongodb();

const app = express();
const port = 8000;
// Middleware to parse JSON data from requests
app.use(express.json());
// add middleware to parse form data instead of JSON
app.use(express.urlencoded({extended: true}));

// use a static folder
app.use(express.static('public')) // static folder to access static files
app.use(cors());
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// available routes
// Use the base route from /routes/index.js
app.use('/', require('./routes'));
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`); 
});