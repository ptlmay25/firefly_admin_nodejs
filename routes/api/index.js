const router = require("express").Router();
const user = require('./user');
const tokenHistory = require('./tokenhistory');
const PurchaseHistoryController = require("../../controllers/purchaseHistory.controller");
const SellHistoryController = require("../../controllers/sellHistory.controller")
const withdrawHistory = require('./withdrawHistory');
const withdrawRequest = require('./withdrawrequest');

router.use('/user', user);
router.use('/token', tokenHistory);
router.use('/purchase',PurchaseHistoryController)
router.use('/sell', SellHistoryController);
router.use('/withdrawHistory', withdrawHistory);
router.use('/withdrawRequest', withdrawRequest);

module.exports = router;