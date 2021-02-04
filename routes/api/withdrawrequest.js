const router = require("express").Router();
const WithdrawRequestController = require("../../controllers/withdrawrequest.controller");

router.post("/add", WithdrawRequestController.create);
router.put("/update/:userId", WithdrawRequestController.update);
router.get("/view/:userId", WithdrawRequestController.view);
router.delete("/delete/:userId", WithdrawRequestController.delete) //It should be done with _id only
router.get("/", WithdrawRequestController.viewAll)

module.exports = router;