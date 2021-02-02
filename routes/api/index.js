const router = require("express").Router();
const user = require('./user');
const tokenHistory = require('./tokenhistory');
const withdrawHistory = require('./withdrawHistory');
const withdrawRequest = require('./withdrawrequest');

router.use('/user', user);
router.use('/token', tokenHistory);
router.use('/withdrawHistory', withdrawHistory);
router.use('/withdrawRequest', withdrawRequest);


module.exports = router;