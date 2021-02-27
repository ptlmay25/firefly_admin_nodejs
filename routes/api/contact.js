const router = require("express").Router();
const Controller = require("../../controllers/contact.controlller");

router.post("/add", Controller.create);
router.get("/", Controller.viewAll);
router.get("/view/user/:userId", Controller.viewUser)


module.exports = router;