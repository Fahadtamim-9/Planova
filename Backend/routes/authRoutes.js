const express = require("express");
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require("../controllers/authController");
const {protect} = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router  = express.Router();

// auth routes
router.post("/resgiter", registerUser); // register user
router.post("/login", loginUser);  // login user
router.get("/profile", protect, getUserProfile); // get user profile
router.put("/profile", protect, updateUserProfile); // update profile

router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
});

module.exports = router;