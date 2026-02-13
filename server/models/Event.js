const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Event name is required"],
      trim: true,
      maxlength: 100,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Event date is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: 2000,
    },
    capacity: {
      type: Number,
      required: [true, "Capacity is required"],
      min: 1,
    },
    registeredCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["conference", "workshop", "meetup", "webinar", "concert", "other"],
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

// Indexes for optimized queries
eventSchema.index({ date: -1 });
eventSchema.index({ category: 1, date: -1 });
eventSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Event", eventSchema);
