const User = require("../../models/user.model");

const getUser = async (req, res) => {
    try {
        const users = await User.find();
        res.json({users,
       count: users.length,

        });
      } catch (error) {
        res.status(500).json({ message: "Server error", error });
      }
}

module.exports = getUser;