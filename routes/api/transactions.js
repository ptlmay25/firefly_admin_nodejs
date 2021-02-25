const router = require("express").Router();
const Controller = require("../../controllers/transactions.controller");

router.get("/", Controller.viewAll)
router.get("/:user_id", Controller.view)


module.exports = router;