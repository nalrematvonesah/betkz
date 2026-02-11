const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const ctrl = require("../controllers/user.controller");

router.get("/profile", auth, ctrl.getProfile);
router.put("/profile", auth, ctrl.updateProfile);
router.post("/deposit", auth, ctrl.deposit);
router.get("/leaderboard", ctrl.leaderboard);

module.exports = router;
