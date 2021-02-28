const router = require("express").Router();
const Controller = require("../../controllers/purchaseHistory.controller");

router.post("/add", Controller.create);
router.get("/", Controller.viewAll)
router.get("/view/user/:user_id", Controller.viewUser)
router.put("/update/:id", Controller.update);
router.delete("/delete/:id", Controller.delete);

module.exports = router;