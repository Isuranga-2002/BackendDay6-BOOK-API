const jwt = require("jsonwebtoken");

const generateToken = (id, email, secret) => {
    return jwt.sign(
        {
            id: id,
            email: email
        },
        secret,
        {
            expiresIn: "1h"
        }
    );
};

const verifyToken = (token, secret) => {
    return jwt.verify(
        token,
        secret
    );
};

module.exports = {
    generateToken,
    verifyToken
};