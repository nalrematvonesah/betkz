const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const ctrl = require("../controllers/event.controller");

router.get("/", ctrl.list);
router.post("/", auth, role("admin"), ctrl.create);
router.put("/:id/result", auth, role("admin"), ctrl.setResult);

module.exports = router;
