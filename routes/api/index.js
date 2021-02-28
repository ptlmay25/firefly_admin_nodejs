const router = require("express").Router();
const user = require('./user');
const tokenHistory = require('./token');
const purchaseHistory = require("./purchaseHistory");
const sellHistory = require("./sellHistory")
const withdrawHistory = require('./withdrawHistory');
const withdrawRequest = require('./withdrawrequest');
const contact = require("./contact");
const dashboard = require("./dashboard");
const buysell = require("./buysell");
const deposit = require("./deposit");
const transactions = require("./transactions");

router.use('/user', user);
router.use('/token', tokenHistory);
router.use('/purchase', purchaseHistory)
router.use('/sell', sellHistory);
router.use('/withdrawHistory', withdrawHistory);
router.use('/withdrawRequest', withdrawRequest);
router.use('/contact', contact);
router.use('/dashboard', dashboard);
router.use('/buysell', buysell);
router.use('/deposit', deposit);
router.use('/transaction', transactions);

module.exports = router;