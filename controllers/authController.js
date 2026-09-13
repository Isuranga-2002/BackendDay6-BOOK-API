const { 
    findUsersByEmail,
    getUserByEmail,
    insertUser
} = require("../models/userModels");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwtutils");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        const [existingUsers] = await findUsersByEmail(email);

        if (existingUsers.length > 0) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        await insertUser(name, email, hashedPassword);

        res.status(201).json({
            message: "User registered successfully"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [users] = await getUserByEmail(email);

        if (users.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = users[0];

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = generateToken(user.id, user.email, process.env.JWT_SECRET);
        res.json({
            message: "Login successful",
            token
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    register, 
    login
};