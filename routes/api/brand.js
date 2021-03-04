const router = require("express").Router();
const Controller = require("../../controllers/brand.controller");

router.post("/create", Controller.create);
router.put("/update/:Id", Controller.update);
router.get("/view/:Id", Controller.view);
router.get("/", Controller.viewAll);
router.delete("/delete/:Id", Controller.delete) //It should be done with _id only

module.exports = router;