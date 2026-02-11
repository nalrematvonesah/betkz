const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Transaction",
  new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    type: {
      type: String,
      enum: ["deposit", "bet", "win"],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  })
);
