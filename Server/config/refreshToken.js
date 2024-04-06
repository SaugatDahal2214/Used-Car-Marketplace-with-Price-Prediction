const jwt = require('jsonwebtoken');

const generateRefreshToken = async (id) => {
    try {
        return jwt.sign({id}, process.env.jwt_secret, {expiresIn: '3d'});
    } catch (error) {
        console.error("Error generating token:", error);
        throw error;
    }
}

module.exports = generateRefreshToken;