const router = require("express").Router();
const user = require('./user');
const tokenHistory = require('./tokenhistory');
const purchaseHistory = require("./purchaseHistory");
const sellHistory = require("./sellHistory")
const withdrawHistory = require('./withdrawHistory');
const withdrawRequest = require('./withdrawrequest');
const dividendHistory = require("./dividendHistory");
const contact = require("./contact");
const dashboard = require("./dashboard");

router.use('/user', user);
router.use('/token', tokenHistory);
router.use('/purchase', purchaseHistory)
router.use('/sell', sellHistory);
router.use('/withdrawHistory', withdrawHistory);
router.use('/withdrawRequest', withdrawRequest);
router.use('/dividendHistory', dividendHistory);
router.use('/contact', contact);
router.use('/dashboard', dashboard);

module.exports = router;