const express = require("express");
const {adminOnly} = require("../middlewares/authMiddleware");
const {getUsers, getUserById, deleteUser} = require("../controllers/userController");

const router = express.Router();

//user management routes
router.get("/",protect, adminOnly, getUsers); //get all users (admin only)
router.get("/:id", protect, getUserById); //get a spiecific user

module.exports = router;