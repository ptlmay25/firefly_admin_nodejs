const router = require("express").Router();
const Controller = require("../../controllers/transactions.controller");

router.get("/", Controller.viewAll)

module.exports = router;