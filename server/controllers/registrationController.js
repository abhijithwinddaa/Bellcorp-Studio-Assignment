const Registration = require("../models/Registration");
const Event = require("../models/Event");

// @desc    Register for an event
// @route   POST /api/registrations/:eventId
const registerForEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    // Check if already registered
    const existing = await Registration.findOne({ userId, eventId });
    if (existing) {
      return res
        .status(409)
        .json({ message: "You are already registered for this event" });
    }

    // Atomically increment registeredCount only if capacity not reached
    const event = await Event.findOneAndUpdate(
      {
        _id: eventId,
        $expr: { $lt: ["$registeredCount", "$capacity"] },
      },
      { $inc: { registeredCount: 1 } },
      { returnDocument: "after" },
    );

    if (!event) {
      // Check if event exists at all
      const eventExists = await Event.findById(eventId);
      if (!eventExists) {
        return res.status(404).json({ message: "Event not found" });
      }
      return res.status(400).json({ message: "Event is at full capacity" });
    }

    // Create registration record
    const registration = await Registration.create({
      userId,
      eventId,
    });

    res.status(201).json({
      message: "Successfully registered for event",
      registration,
    });
  } catch (error) {
    // Handle duplicate key error (race condition fallback)
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: "You are already registered for this event" });
    }
    next(error);
  }
};

// @desc    Cancel event registration
// @route   DELETE /api/registrations/:eventId
const cancelRegistration = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    const registration = await Registration.findOneAndDelete({
      userId,
      eventId,
    });

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    // Decrement registeredCount
    await Event.findByIdAndUpdate(eventId, {
      $inc: { registeredCount: -1 },
    });

    res.json({ message: "Registration cancelled successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged-in user's registrations
// @route   GET /api/registrations/my
const getMyRegistrations = async (req, res, next) => {
  try {
    const registrations = await Registration.find({ userId: req.user._id })
      .populate({
        path: "eventId",
        populate: { path: "organizer", select: "name email" },
      })
      .sort({ registeredAt: -1 })
      .lean();

    // Extract event data and add registration info
    const events = registrations
      .filter((r) => r.eventId) // filter out deleted events
      .map((r) => ({
        ...r.eventId,
        registrationId: r._id,
        registeredAt: r.registeredAt,
      }));

    res.json(events);
  } catch (error) {
    next(error);
  }
};

// @desc    Check if user is registered for a specific event
// @route   GET /api/registrations/check/:eventId
const checkRegistration = async (req, res, next) => {
  try {
    const registration = await Registration.findOne({
      userId: req.user._id,
      eventId: req.params.eventId,
    });

    res.json({ isRegistered: !!registration });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerForEvent,
  cancelRegistration,
  getMyRegistrations,
  checkRegistration,
};
