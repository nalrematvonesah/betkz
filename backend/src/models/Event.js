const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  odds: {
    home: { type: Number, required: true },
    draw: { type: Number, required: true },
    away: { type: Number, required: true }
  },
  status: { type: String, default: "active" },
  result: {
    type: String,
    enum: ["home", "draw", "away", null],
    default: null
  }
});

module.exports =
  mongoose.models.Event || mongoose.model("Event", EventSchema);
