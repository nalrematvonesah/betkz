const User = require("../models/User");
const Transaction = require("../models/Transaction");

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    req.body,
    { new: true }
  ).select("-password");

  res.json(user);
};

exports.deposit = async (req, res) => {
  const rawAmount = req.body.amount;
  const amount = Number(rawAmount);

  if (!rawAmount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ message: "Invalid deposit amount" });
  }

  const user = await User.findById(req.user.id);
  user.balance += amount;
  await user.save();

  await Transaction.create({
    user: user._id,
    type: "deposit",
    amount
  });

  res.json({ balance: user.balance });
};

exports.leaderboard = async (req, res) => {
  const users = await User.find({}, "username balance")
    .sort({ balance: -1 })
    .limit(10);

  res.json(users);
};
