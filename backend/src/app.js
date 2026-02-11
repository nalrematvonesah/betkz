require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/db");

connectDB();
const app = express();
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/bets", require("./routes/bet.routes"));
app.use("/api/events", require("./routes/event.routes"));
app.use("/api/transactions", require("./routes/transaction.routes"));

app.use(express.static(path.join(__dirname, "../public")));
app.get("*", (_, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);

module.exports = app;
