const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        console.log('Contact token: ', token);
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({_id: verifyToken._id, "tokens.token": token});
        if(!rootUser) { throw new Error('User not found')}
        console.log('user found');
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        next();
    } catch(err) {
        res.status(401).send('Unauthorized: No token provided');
    }
}

module.exports = Authenticate;