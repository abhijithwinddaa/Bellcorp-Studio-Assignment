const Event = require("../models/Event");

// @desc    Get all events with search, filter, pagination
// @route   GET /api/events
const getEvents = async (req, res, next) => {
  try {
    const {
      search,
      category,
      location,
      dateFilter,
      page = 1,
      limit = 12,
    } = req.query;
    const query = {};

    // Text search on name
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by location
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    // Filter by date — upcoming or past
    if (dateFilter === "upcoming") {
      query.date = { $gte: new Date() };
    } else if (dateFilter === "past") {
      query.date = { $lt: new Date() };
    }

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [events, totalEvents] = await Promise.all([
      Event.find(query)
        .populate("organizer", "name email")
        .sort({ date: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Event.countDocuments(query),
    ]);

    res.json({
      events,
      currentPage: pageNum,
      totalPages: Math.ceil(totalEvents / limitNum),
      totalEvents,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single event by ID
// @route   GET /api/events/:id
const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("organizer", "name email")
      .lean();

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    next(error);
  }
};

// @desc    Get distinct categories
// @route   GET /api/events/categories
const getCategories = async (req, res, next) => {
  try {
    const categories = await Event.distinct("category");
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

// @desc    Get distinct locations
// @route   GET /api/events/locations
const getLocations = async (req, res, next) => {
  try {
    const locations = await Event.distinct("location");
    res.json(locations);
  } catch (error) {
    next(error);
  }
};

module.exports = { getEvents, getEventById, getCategories, getLocations };
