const router = require("express").Router();
const WithdrawHistoryController = require("../../controllers/withdrawhistory.controller");

router.post("/add", WithdrawHistoryController.create);
router.put("/update/:request_number", WithdrawHistoryController.update);
router.get("/view/:request_number", WithdrawHistoryController.view);
router.delete("/delete/:request_number", WithdrawHistoryController.delete) //It should be done with _id only
router.get("/", WithdrawHistoryController.viewAll)

module.exports = router;