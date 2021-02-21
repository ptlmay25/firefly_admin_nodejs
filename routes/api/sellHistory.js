const router = require("express").Router();
const Controller = require("../../controllers/sellHistory.controller");

router.post("/add",Controller.create);
router.get("/",Controller.viewAll)
router.put("/update/:id", Controller.update);
router.delete("/delete/:id", Controller.delete);

module.exports = router;