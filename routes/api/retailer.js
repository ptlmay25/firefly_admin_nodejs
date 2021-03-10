const router = require("express").Router();
const RetailerController = require("../../controllers/retailer.controller");

router.post("/create", UserController.create);
router.get("/", UserController.viewAll);
router.delete("/delete/:mobileNo", UserController.delete) //It should be done with _id only

module.exports = router;