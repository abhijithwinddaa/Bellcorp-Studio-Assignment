const express = require("express");
const router = express.Router();
const { signup, login, getMe } = require("../controllers/authController");
const {
  signupValidation,
  loginValidation,
} = require("../validators/authValidator");
const { validate } = require("../middleware/validate");
const { protect } = require("../middleware/authMiddleware");

router.post("/signup", signupValidation, validate, signup);
router.post("/login", loginValidation, validate, login);
router.get("/me", protect, getMe);

module.exports = router;
