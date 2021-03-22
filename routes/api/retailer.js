const router = require("express").Router();
const RetailerController = require("../../controllers/retailer.controller");

router.post("/create", RetailerController.create);
router.get("/", RetailerController.viewAll);
router.get("/view/:id", RetailerController.view);
router.put("/update/:id", RetailerController.update)
router.delete("/delete/:id", RetailerController.delete); //It should be done with _id only

module.exports = router;