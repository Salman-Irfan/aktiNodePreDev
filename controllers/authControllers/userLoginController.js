const User = require('../../models/UserModel');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const userLoginController = async (req, res) => {
    dotenv.config();
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ error: 'Email or password is incorrect' });
        }

        const passwordCompare = await bcrypt.compareSync(password, user.password);

        if (!passwordCompare) {
            return res.status(400).json({ error: 'Email or password is incorrect' });
        }

        // Extracting password and rest of the user data
        const { password: hashedPassword, ...userWithoutPassword } = user.toObject(); 

        const authtoken = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
        success = true;

        res.json({ success, authtoken, user: userWithoutPassword });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports = userLoginController;
