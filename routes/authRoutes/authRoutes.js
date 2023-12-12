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
const deleteUserController = require('../../controllers/authControllers/deleteUserController');
const getEmailVerificationController = require('../../controllers/authControllers/getEmailVerificationController');

// multer middleware
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === "profileImage") {
            cb(null, path.resolve(__dirname, '../../public/profileImages'));
        } else if (file.fieldname === "document") {
            cb(null, path.resolve(__dirname, '../../public/documents'));
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
    }
});


let upload = multer({
    storage: storage,
}).fields([{ name: 'profileImage', maxCount: 1 }, { name: 'document', maxCount: 2 }])

// create note route
router.post("/register",
    upload,
    [
        body("firstName", "Enter a valid name min 3 characters").isLength({
            min: 3,
        }),
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password length min 5").isLength({ min: 5 }),
    ],
    userRegisterController
);

// get email verification link
router.get('/users/:id/verify/:token', getEmailVerificationController)

// login route
router.post('/login', userLoginController);

// delete user
router.delete('/delete/:id', requireSignIn, deleteUserController);

// get all users - admin
router.get('/users', requireSignIn, isAdmin, getAllUsersController);

module.exports = router; 