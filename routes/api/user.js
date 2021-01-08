const router = require("express").Router();
const UserController = require("../../controllers/user.controller");

router.post("/create", UserController.create);
router.put("/update", UserController.update);
router.get("/view/:userId", UserController.view);
router.get("/viewMobile/:mobileNo", UserController.viewWithMobileNO);
router.get("/", UserController.viewAll);
router.get("/checkUser/:mobileNo", UserController.userCheck)

module.exports = router;