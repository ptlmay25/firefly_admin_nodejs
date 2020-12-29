const router = require("express").Router();
router.get("/", (req, res) => {

    res.send("Routing seetup is done");
});
module.exports = router;