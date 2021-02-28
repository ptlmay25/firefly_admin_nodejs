const router = require("express").Router();
const Controller = require("../../controllers/tokenhistory.controller");

router.get("/", Controller.viewAll);
router.get("/view/:id", Controller.view)
router.get("/getLatestTokenPrice", Controller.getLatestTokenPrice);
router.get("/getNumberOfTokens", Controller.getNumberOfTokens);
router.post("/create", Controller.create);
router.put("/update/:id", Controller.update);
router.delete("/delete/:id", Controller.delete);

module.exports = router;