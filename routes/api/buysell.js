const router = require("express").Router();
const Controller = require("../../controllers/buysell.controller");

router.post("/buy", Controller.buy);
router.post("/sell", Controller.sell);

module.exports = router;