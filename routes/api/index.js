const router = require("express").Router();
const user = require('./user');
const tokenHistory = require('./tokenhistory');
const token = require("../../models/token");

router.use('/user', user);
router.use('/token', tokenHistory)
module.exports = router;