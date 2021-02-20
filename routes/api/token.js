const router = require("express").Router();
const Controller = require("../../controllers/tokenhistory.controller");

router.get("/", Controller.viewAll);
router.get("/getLatestTokenPrice", Controller.getLatestTokenPrice);
router.post("/create", Controller.create);
router.put("/update/:id", Controller.update);
router.delete("/delete/:id", Controller.delete);

module.exports = router;