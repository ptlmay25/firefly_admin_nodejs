const router = require("express").Router();
const user = require('./user');
const tokenHistory = require('./tokenhistory');
const withdrawHistory = require('./withdrawHistory');

router.use('/user', user);
router.use('/token', tokenHistory);
router.use('/withdrawHistory', withdrawHistory)


module.exports = router;