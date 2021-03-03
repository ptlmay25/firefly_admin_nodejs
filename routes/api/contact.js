const router = require("express").Router();
const Controller = require("../../controllers/contact.controlller");

router.post("/add", Controller.create);
router.get("/history", Controller.viewHistory);
router.get("/request", Controller.viewRequest);
router.get("/view/user/:userId", Controller.viewUser)


module.exports = router;