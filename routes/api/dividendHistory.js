const router = require("express").Router();
const DividendHistoryController = require("../../controllers/dividendHistory.controller");

router.post("/add",DividendHistoryController.create);
router.get("/",DividendHistoryController.viewAll)

module.exports = router;