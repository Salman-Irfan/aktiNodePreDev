const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// protected routing - token based - requires sign in

dotenv.config();


const requireSignIn = async (req, res, next) => {
    let token = req.headers.authorization;
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7); 
    } else {
        console.log('Token not found or improperly formatted');
    }
    const tokenSecret = process.env.JWT_SECRET
    try {
        const decoded = jwt.verify(token, tokenSecret)
        req.user = decoded;
        console.log(decoded); // { email: 'salman7@gmail.com', iat: 1698518113 }
        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = requireSignIn