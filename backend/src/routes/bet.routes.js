const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const ctrl = require("../controllers/bet.controller");

router.get("/", auth, ctrl.getMyBets);
router.post("/", auth, ctrl.create);
router.put("/resolve/event/:id", auth, role("admin"), ctrl.resolveByEvent);

module.exports = router;
