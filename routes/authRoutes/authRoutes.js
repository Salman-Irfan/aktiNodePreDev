const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const userRegisterController = require('../../controllers/authControllers/userRegisterController');
const userLoginController = require('../../controllers/authControllers/userLoginController');
const multer = require('multer');
const path = require('path');
const getAllUsersController = require('../../controllers/authControllers/getAllUsersController');
const requireSignIn = require('../../middlewares/authMiddleware');
const isAdmin = require('../../middlewares/isAdmin');

// multer middleware
let storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, path.resolve(__dirname, '../../public/profileImages'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
    }
})

let uploadProfileImage = multer({
    storage: storage,
}).single("profileImage")

// create note route
router.post("/register",
    uploadProfileImage,
    [
        body("firstName", "Enter a valid name min 3 characters").isLength({
            min: 3,
        }),
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password length min 5").isLength({ min: 5 }),
    ],
    userRegisterController
);

// login route
router.post('/login', userLoginController );

// get all users
router.get('/users', requireSignIn, isAdmin, getAllUsersController);

module.exports = router;