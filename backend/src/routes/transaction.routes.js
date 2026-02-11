const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const ctrl = require("../controllers/transaction.controller");

router.get("/my", auth, ctrl.myTransactions);

module.exports = router;
