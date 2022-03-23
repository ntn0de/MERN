const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").post(registerUser);
router.route("/me").get(protect, getMe);
//or
// router.get("/me", protect, getMe);
router.route("/login").post(loginUser);

module.exports = router;
