const router = require("express").Router();
const UserController = require("../../controllers/user.controller");

router.post("/create", UserController.create);
router.put("/update", UserController.update);
router.get("/view", UserController.view);
router.get("/", UserController.viewAll);

module.exports = router;
