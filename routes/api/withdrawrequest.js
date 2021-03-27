const router = require("express").Router();
const WithdrawRequestController = require("../../controllers/withdrawrequest.controller");

// this is main thing.

router.post("/add/", WithdrawRequestController.create);
router.put("/update/:request_No", WithdrawRequestController.update);
router.get("/view/:request_No", WithdrawRequestController.view);
router.get("/view/user/:userId", WithdrawRequestController.viewUserRequests);
router.delete("/delete/:request_No", WithdrawRequestController.delete) //It should be done with _id only
router.get("/", WithdrawRequestController.viewAll)
router.put("/check/:request_No/user/:userId", WithdrawRequestController.statusCheck);
module.exports = router;