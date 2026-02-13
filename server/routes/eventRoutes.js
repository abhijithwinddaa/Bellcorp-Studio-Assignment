const express = require("express");
const router = express.Router();
const {
  getEvents,
  getEventById,
  getCategories,
  getLocations,
} = require("../controllers/eventController");

// Static routes must come before :id param route
router.get("/categories", getCategories);
router.get("/locations", getLocations);
router.get("/", getEvents);
router.get("/:id", getEventById);

module.exports = router;
