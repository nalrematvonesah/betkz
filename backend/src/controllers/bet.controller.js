const Bet = require("../models/Bet");
const Event = require("../models/Event");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

exports.create = async (req, res) => {
  const { eventId, outcome, amount } = req.body;
  const a = Number(amount);

  if (!eventId || !["home","draw","away"].includes(outcome) || !a || a <= 0) {
    return res.status(400).json({ message: "Invalid bet data" });
  }

  const ev = await Event.findById(eventId);
  if (!ev || ev.status !== "active") {
    return res.status(400).json({ message: "Event not available" });
  }

  const odds = ev.odds[outcome];
  if (!odds) return res.status(400).json({ message: "Invalid outcome" });

  const user = await User.findById(req.user.id);
  if (user.balance < a) {
    return res.status(400).json({ message: "Insufficient balance" });
  }

  user.balance -= a;
  await user.save();

  const bet = await Bet.create({
    user: user._id,
    event: ev._id,
    title: ev.title,
    outcome,
    odds,
    amount: a
  });

  await Transaction.create({ user: user._id, type: "bet", amount: a });

  res.json(bet);
};

exports.resolveByEvent = async (req, res) => {
  const ev = await Event.findById(req.params.id);

  if (!ev) {
    return res.status(404).json({ message: "Event not found" });
  }

  if (ev.status !== "closed") {
    return res.status(400).json({ message: "Event not closed yet" });
  }

  const bets = await Bet.find({
    event: ev._id,
    status: "pending"
  }).populate("user");

  for (const bet of bets) {
    if (bet.outcome === ev.result) {
      const payout = Number(bet.amount) * Number(bet.odds);

      bet.status = "won";
      bet.payout = payout;

      bet.user.balance = Number(bet.user.balance) + payout;
      await bet.user.save();

      await Transaction.create({
        user: bet.user._id,
        type: "win",
        amount: payout
      });
    } else {
      bet.status = "lost";
    }

    await bet.save();
  }

  res.json({ message: "Bets resolved successfully" });
};


exports.getMyBets = async (req, res) => {
  try {
    const bets = await Bet.find({ user: req.user.id })
      .populate("event")
      .sort({ createdAt: -1 })
      .lean();

    res.json(bets);
  } catch (err) {
    res.status(500).json({ message: "Failed to load bet history" });
  }
};
