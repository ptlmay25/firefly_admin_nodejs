const router = require("express").Router();
const SellHistoryController = require("../../controllers/sellHistory.controller");

router.post("/add",SellHistoryController.create);
router.get("/",SellHistoryController.viewAll)

module.exports = router;