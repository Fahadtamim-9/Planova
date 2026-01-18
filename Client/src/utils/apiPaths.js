export const BASE_URL = "http://localhost:8000";

// utils/apiPath.js
export const API_PATHS = {
  AUTH: {
    REGISTER: "/auth/register", // this register a newuser (memberr or admin)
    LOGIN: "/auth/login", // Authenticate user & return JWT tokenn
    GET_PROFILE: "/auth/profile", // get logged-in to user details
  },

  USERS: {
    GET_ALL_USERS: "/users", // Get all users (Admin only)
    GET_USER_BY_ID: (userId) => `/users/${userId}`, // Get user by ID
    CREATE_USER: "/users", // Create a new user (Admin only)
    UPDATE_USER: (userId) => `/users/${userId}`, // Update user details
    DELETE_USER: (userId) => `/users/${userId}`, // Delete a user
  },

  TASKS: {
    GET_DASHBOARD_DATA: "/tasks/dashboard-data", // Get Dashboard Data
    GET_USER_DASHBOARD_DATA: "/tasks/user-dashboard-data", // Get User Dashboard Data
    GET_ALL_TASKS: "/tasks", // Get all tasks (Admin: all, User: only assigned tasks)
    GET_TASK_BY_ID: (taskId) => `/tasks/${taskId}`, // Get task by ID
    CREATE_TASK: "/tasks", // Create a new task (Admin only)
    UPDATE_TASK: (taskId) => `/tasks/${taskId}`, // Update task details
    DELETE_TASK: (taskId) => `/tasks/${taskId}`, // Delete a task (Admin only)

    UPDATE_TASK_STATUS: (taskId) => `/tasks/${taskId}/status`, // Update task status
    UPDATE_TODO_CHECKLIST: (taskId) => `/tasks/${taskId}/todo`, // Update todo checklist
  },

  REPORTS: {
    EXPORT_TASKS: "/reports/export/tasks", // Download all tasks as an Excel/PDF report
    EXPORT_USERS: "/reports/export/users", // Download user-task report
  },

  IMAGE: {
    UPLOAD_IMAGE: "/auth/upload-image",
  },
};
