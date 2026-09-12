const db = require("../config/db");

const getProfile = async (req, res) => {
    try {
        const [users] = await db.execute(
            "SELECT id, name, email, created_at FROM users WHERE id = ?",
            [req.user.id]
        );
        if (users.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.json(users[0]);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    getProfile
};
