const { verifyToken } = require("../utils/jwtutils");

const auth = (req, res, next) => {
    try {
       const authHeader = req.headers.authorization;
       
        if (!authHeader) {
            return res.status(401).json({
                message: "Authentication token required"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = verifyToken(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = auth;