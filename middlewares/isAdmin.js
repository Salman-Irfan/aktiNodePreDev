const jwt = require('jsonwebtoken');
const User = require('../models/UserModel.js');
const dotenv = require('dotenv');

dotenv.config();

const isAdmin = async (req, res, next) => {
    try {
        // Ensure req.user exists and has the email field
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized - Invalid user data',
            });
        }

        // Find the user by email
        const user = await User.findOne({ email: req.user.email });

        if (user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized - must be admin role',
            });
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = isAdmin;
