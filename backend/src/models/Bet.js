const mongoose = require("mongoose");

const BetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  title: String,
  outcome: { type: String, enum: ["home", "draw", "away"] },
  odds: Number,
  amount: Number,
  status: { type: String, default: "pending" },
  payout: { type: Number, default: 0 }
});

module.exports =
  mongoose.models.Bet || mongoose.model("Bet", BetSchema);
