const Afterware = require("../lib/afterware");
const User = require("../models/user");
const Purchase = require("../models/purchase");
const Sell = require("../models/sell");
const Deposit = require("../models/deposit");
const Withdraw = require("../models/withdraw_history");
const purchase = require("../models/purchase");

class TransactionHistoryController {

    static async viewAll(req, res) {
        try {
            const withdraws = await Withdraw.find({}).sort({date: -1});
            const deposits = await Deposit.find({}).sort({date: -1});
            const purchases = await Purchase.find({}).sort({date: -1});
            const sells = await Sell.find({}).sort({date: -1});

            all_transactions = []
            for(withdraw in withdraws)
            {
                all_transactions.push({
                    type: "withdraw",
                    date: withdraw.date,
                    user_id: withdraw.userId,
                    amount: withdraw.total_amount,
                })
            }
            for(deposit in deposits)
            {
                all_transactions.push({
                    type: "deposit",
                    date: deposit.date,
                    user_id: deposit.user_id,
                    amount: deposit.total_amount,
                })
            }
            for(purchase in purchases)
            {
                all_transactions.push({
                    type: "purchase",
                    date: purchase.date,
                    user_id: purchase.user_id,
                    amount: purchase.num_of_tokens*purchase.token_price,
                    token_price: purchase.token_price,
                    number_of_tokens: purchase.number_of_tokens,
                })
            }
            for(sell in sells)
            {
                all_transactions.push({
                    type: "sell",
                    date: sell.date,
                    user_id: sell.user_id,
                    amount: sell.num_of_tokens*sell.token_price,
                    token_price: sell.token_price,
                    number_of_tokens: sell.number_of_tokens,
                })
            }

            return all_transactions.sort((d1, d2)=>{
                if (d1.date < d2.date) return -1;
                if (d1.date > d2.date) return 1;
                return 0;
            });
        } catch (error) {
            console.log(error);
            return Afterware.sendResponse(req, res, 500, {
                status: "error",
                message: "Internal Server Error",
            });
        }
    }

}

module.exports = TransactionHistoryController;