const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

// Compound unique index — prevents double registration
registrationSchema.index({ userId: 1, eventId: 1 }, { unique: true });
registrationSchema.index({ userId: 1 });
registrationSchema.index({ eventId: 1 });

module.exports = mongoose.model("Registration", registrationSchema);
