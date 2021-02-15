const router = require("express").Router();

const DashboardController = require("../../controllers/dashboard.controller.js");

router.get("/", DashboardController.getData);

module.exports = router;