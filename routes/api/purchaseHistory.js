const router = require("express").Router();
const purchaseHistoryController = require("../../controllers/purchaseHistory.controller");

router.post("/add",purchaseHistoryController.create);
router.get("/",purchaseHistoryController.viewAll)

module.exports = router;