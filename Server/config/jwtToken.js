const jwt = require('jsonwebtoken');

const generateToken = async (id) => {
    try {
        return jwt.sign({id}, process.env.jwt_secret, {expiresIn: '1d'});
    } catch (error) {
        console.error("Error generating token:", error);
        throw error;
    }
}

module.exports = generateToken;