const Event = require("../models/Event");

exports.create = async (req, res) => {
  const { title, odds } = req.body;

  if (!title || !odds?.home || !odds?.draw || !odds?.away) {
    return res.status(400).json({ message: "Invalid event data" });
  }

  const ev = await Event.create({ title, odds });
  res.json(ev);
};

exports.list = async (req, res) => {
  const events = await Event.find({ status: "active" });
  res.json(events);
};

exports.setResult = async (req, res) => {
  const { result } = req.body;
  if (!["home", "draw", "away"].includes(result)) {
    return res.status(400).json({ message: "Invalid result" });
  }

  const ev = await Event.findById(req.params.id);
  ev.result = result;
  ev.status = "closed";
  await ev.save();

  res.json(ev);
};
