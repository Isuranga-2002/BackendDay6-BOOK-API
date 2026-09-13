const { getUserProfile } = require("../models/userModels")

const getProfile = async (req, res) => {
    try {
        const id = req.user.id;
        const [users] = await getUserProfile(id);
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
