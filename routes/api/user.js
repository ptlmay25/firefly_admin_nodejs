const router = require("express").Router();
const UserController = require("../../controllers/user.controller");

router.post("/create", UserController.create);
router.post("/update", UserController.update);
router.post("/view", UserController.view);
router.post("/", UserController.viewAll);
router.get("/", UserController.viewAll);

module.exports = router;