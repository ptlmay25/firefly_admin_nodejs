const router = require("express").Router();
const user = require('./user');
const tokenHistory = require('./tokenhistory');
const PurchaseHistoryController = require("../../controllers/purchaseHistory.controller");
const SellHistoryController = require("../../controllers/sellHistory.controller")

router.use('/user', user);
router.use('/token', tokenHistory);
router.use('/purchase',PurchaseHistoryController)
router.use('/sell', SellHistoryController);

module.exports = router;