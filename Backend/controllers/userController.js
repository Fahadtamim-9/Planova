const Task = require("../models/Task");
const User = require("../models/User");

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private (admin)
const getUsers = async (req, res) => {
    try {
        const users = await User.find({ role:'member'}).select("-password");

        // add task counts for each user
        const usersWithTaskCounts = await Promise.all(users.map(async (user) => {
        const pendingTasks = await Task.countDocuments({ assignedTo: user._id, status: "pending" });
        const inProgressTasks = await Task.countDocuments({ assignedTo: user._id, status: "in-progress" });
        const completedTasks = await Task.countDocuments({ assignedTo: user._id, status: "completed" });
        return {
            ...user._doc,
            pendingTasks,
            inProgressTasks,
            completedTasks
        };
    }));

        res.json(usersWithTaskCounts);
    } catch (error) {
        res.status(500).json({ message: "Server error",error: error.message });
    }
};
// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error",error: error.message });
    }
};



module.exports = {getUsers, getUserById};