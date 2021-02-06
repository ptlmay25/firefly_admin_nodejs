const router = require("express").Router();
const ContactController = require("../../controllers/contact.controlller");

router.post("/add", ContactController.create);
router.get("/", ContactController.viewAll)

module.exports = router;