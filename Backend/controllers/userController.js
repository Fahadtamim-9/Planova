const fs = require("fs");
const path = require("path");

function tryRequireModel(...names) {
  for (const name of names) {
    try {
      return require(path.join(__dirname, "..", "models", name));
    } catch (_) {}
  }
  return null;
}

const User = tryRequireModel("userModel", "User", "user");
const Task = tryRequireModel("Task", "task", "Tasks");

if (!User) {
  throw new Error(
    "Cannot find user model. Expected a file in ../models named one of: userModel.js, User.js, user.js",
  );
}
if (!Task) {
  throw new Error(
    "Cannot find Task model. Expected a file in ../models named one of: Task.js, task.js, Tasks.js",
  );
}

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private (admin)
const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "member" }).select("-password");

    // add task counts for each user
    const usersWithTaskCounts = await Promise.all(
      users.map(async (user) => {
        const pendingTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "Pending",
        });
        const inProgressTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "In Progress",
        });
        const completedTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "Completed",
        });
        return {
          ...user._doc,
          pendingTasks,
          inProgressTasks,
          completedTasks,
        };
      }),
    );

    res.json(usersWithTaskCounts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
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
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// delete a user (admin)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.remove();
    return res.status(200).json({ message: "User removed" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  deleteUser,
};
