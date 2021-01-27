const router = require("express").Router();
const WithdrawHistoryController = require("../../controllers/withdrawhistory.controller");

router.post("/add", WithdrawHistoryController.create);
router.get("/", WithdrawHistoryController.viewAll)

module.exports = router;