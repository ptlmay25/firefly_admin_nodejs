const router = require("express").Router();
const TokenHistoryController = require("../../controllers/tokenhistory.controller");

router.post("/add",TokenHistoryController.create);
router.get("/",TokenHistoryController.viewAll)

module.exports = router;