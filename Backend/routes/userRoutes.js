const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

const protect = authMiddleware.protect || authMiddleware.default || authMiddleware;
const adminOnly = authMiddleware.adminOnly || (authMiddleware.default && authMiddleware.default.adminOnly);

if (typeof protect !== "function" || (adminOnly && typeof adminOnly !== "function")) {
  console.error("authMiddleware exports:", Object.keys(authMiddleware), "protect:", typeof protect, "adminOnly:", typeof adminOnly);
  throw new Error("authMiddleware must export functions 'protect' and 'adminOnly'");
}

const { getUsers, getUserById, deleteUser } = userController;
const missing = [];
if (typeof getUsers !== "function") missing.push("getUsers");
if (typeof getUserById !== "function") missing.push("getUserById");
if (typeof deleteUser !== "function") missing.push("deleteUser");
if (missing.length) {
  console.error("userController exports:", Object.keys(userController), "missing:", missing);
  throw new Error("userController must export functions: " + missing.join(", "));
}

const router = express.Router();

// user management routes
router.get("/", protect, adminOnly, getUsers); // get all users (admin only)
router.get("/:id", protect, getUserById); // get a specific user
router.delete("/:id", protect, adminOnly, deleteUser); // delete a user (admin only)

module.exports = router;