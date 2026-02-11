const Transaction = require("../models/Transaction");

exports.myTransactions = async (req, res) => {
  const tx = await Transaction.find({ user: req.user.id })
    .sort({ createdAt: -1 });

  res.json(tx);
};
