const Afterware = require("../lib/afterware");
const Purchase = require("../models/purchase");
const Sell = require("../models/sell");
const Deposit = require("../models/deposit");
const Withdraw = require("../models/withdraw_history");

class TransactionHistoryController {

    static async viewAll(req, res) {
        try {
            const withdraws = await Withdraw.find({}).sort({date: -1});
            const deposits = await Deposit.find({}).sort({date: -1});
            const purchases = await Purchase.find({}).sort({date: -1});
            const sells = await Sell.find({}).sort({date: -1});

            let all_transactions = []
            for(let withdraw of withdraws)
            {
                all_transactions.push({
                    type: "Withdraw",
                    date: withdraw.date,
                    user_id: withdraw.userId,
                    amount: withdraw.total_amount,
                })
            }
            for(let deposit of deposits)
            {
                console.log(deposit)
                all_transactions.push({
                    type: "Add Funds",
                    date: deposit.date,
                    user_id: deposit.user_id,
                    amount: deposit.total_amount,
                })
            }
            for(let purchase of purchases)
            {
                all_transactions.push({
                    type: "Token Buy",
                    date: purchase.date,
                    user_id: purchase.user_id,
                    amount: purchase.num_of_tokens*purchase.token_price,
                    token_price: purchase.token_price,
                    number_of_tokens: purchase.number_of_tokens,
                })
            }
            for(let sell of sells)
            {
                all_transactions.push({
                    type: "Token Sell",
                    date: sell.date,
                    user_id: sell.user_id,
                    amount: sell.num_of_tokens*sell.token_price,
                    token_price: sell.token_price,
                    number_of_tokens: sell.number_of_tokens,
                })
            }

            all_transactions = all_transactions.sort((d1, d2)=>{
                if (d1.date < d2.date) return -1;
                if (d1.date > d2.date) return 1;
                return 0;
            });

            return Afterware.sendResponse(req, res, 200, {
                status: "success",
                data: all_transactions,
            });
        } catch (error) {
            console.log(error);
            return Afterware.sendResponse(req, res, 500, {
                status: "error",
                message: "Internal Server Error",
            });
        }
    }

    static async view(req, res) {
        try {
            const user_id = req.params.user_id;

            const withdraws = await Withdraw.find({userId:user_id}).sort({date: -1});
            const deposits = await Deposit.find({user_id:user_id}).sort({date: -1});
            const purchases = await Purchase.find({user_id:user_id}).sort({date: -1});
            const sells = await Sell.find({user_id:user_id}).sort({date: -1});

            let all_transactions = []
            for(let withdraw of withdraws)
            {
                all_transactions.push({
                    type: "Withdraw",
                    date: withdraw.date,
                    user_id: withdraw.userId,
                    amount: withdraw.total_amount,
                })
            }
            for(let deposit of deposits)
            {
                all_transactions.push({
                    type: "Add Funds",
                    date: deposit.date,
                    user_id: deposit.user_id,
                    amount: deposit.total_amount,
                })
            }
            for(let purchase of purchases)
            {
                all_transactions.push({
                    type: "Token Buy",
                    date: purchase.date,
                    user_id: purchase.user_id,
                    amount: purchase.num_of_tokens*purchase.token_price,
                    token_price: purchase.token_price,
                    number_of_tokens: purchase.number_of_tokens,
                })
            }
            for(let sell of sells)
            {
                all_transactions.push({
                    type: "Token Sell",
                    date: sell.date,
                    user_id: sell.user_id,
                    amount: sell.num_of_tokens*sell.token_price,
                    token_price: sell.token_price,
                    number_of_tokens: sell.number_of_tokens,
                })
            }

            all_transactions = all_transactions.sort((d1, d2)=>{
                if (d1.date < d2.date) return -1;
                if (d1.date > d2.date) return 1;
                return 0;
            });

            return Afterware.sendResponse(req, res, 200, {
                status: "success",
                data: all_transactions,
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