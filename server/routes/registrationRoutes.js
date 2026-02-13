const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  registerForEvent,
  cancelRegistration,
  getMyRegistrations,
  checkRegistration,
} = require("../controllers/registrationController");

// All registration routes are protected
router.use(protect);

router.get("/my", getMyRegistrations);
router.get("/check/:eventId", checkRegistration);
router.post("/:eventId", registerForEvent);
router.delete("/:eventId", cancelRegistration);

module.exports = router;
