const db = require("../config/databaseConfig");

const findUsersByEmail = async (email) => {
    return await db.execute(
        "SELECT id FROM users WHERE email = ?",
        [email]
    )
};

const getUserByEmail = async (email) => {
    return await db.execute(
        "SELECT * FROM users WHERE email = ?",
        [email]
    )
};

const getUserProfile = async (id) => {
    return await db.execute(
        "SELECT id, name, email, created_at FROM users WHERE id = ?",
        [id]
    )
};

const insertUser = async (name, email, hashedPassword) => {
    return await db.execute(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword]
    )
};

module.exports = {
    findUsersByEmail,
    getUserByEmail,
    getUserProfile,
    insertUser
}