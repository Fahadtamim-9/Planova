const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {
  getDashboardData,
  getUserDashboardData,
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskChecklist,
} = require("../controllers/taskController");

const router = express.Router();

//Project management Routes

router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData);
router.get("/", protect, getTasks); //get all tasks (Admin: all, User: assigned)
router.get("/:id", protect, getTaskById); //get task by Id
router.post("/", protect, adminOnly, createTask); //create a task (Admin only)
router.put("/:id", protect, updateTask); //update task details
router.delete("/:id", protect, adminOnly, deleteTask); //delete a task (Admin only)
router.put("/:id/status", protect, updateTaskStatus); //update task status
router.put("/:id/todo", protect, updateTaskChecklist); //update task checklist

module.exports = router;
