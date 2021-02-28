const Afterware = require("../lib/afterware");
const TokenHistoryController = require("./tokenhistory.controller");
const User = require("../models/user");
const purchaseHistory = require("../models/purchase");
const sellHistory = require("../models/sell");
const depositHistory = require("../models/deposit")

class BuySellController {

    static async buy(req, res) {
        try {
            const data = req.body.data;
            
            const user_id = data.user_id || "";
            const users = (await User.find({_id:user_id}))
            if(users.length != 1)
            {
                return Afterware.sendResponse(req, res, 500, {
                    status: "fail",
                    message: "User Not Exists",
                });
            }
            
            let user = users[0]
            const token_price = (await TokenHistoryController._getLatestTokenPrice()).token_price
            const num_of_tokens = data.num_of_tokens || 1;

            const payment_token = data.payment_token || ""
            if(payment_token=="")
            {
                if(num_of_tokens*token_price > user.acc_bal)
                {
                    return Afterware.sendResponse(req, res, 500, {
                        status: "fail",
                        message: "Balance not sufficient"
                    });
                }

                // update user
                user.acc_bal = user.acc_bal - num_of_tokens*token_price;
                user.tokens = user.tokens + num_of_tokens
                user.total_purchase = user.total_purchase + num_of_tokens*token_price;
                let updatedUser = await user.save();

                // add record to history
                const collection = new purchaseHistory({user_id:user_id, num_of_tokens:num_of_tokens, token_price:token_price})
                let savedDoc = await collection.save()

                return Afterware.sendResponse(req, res, 200, {
                    status: "success",
                    data: savedDoc,
                    updatedUser: updatedUser,
                    message: "Buying operation successful",
                });
            }
            else{
                // paid by razorpay
                const collection = new depositHistory({user_id: user_id, total_amount: num_of_tokens*token_price, payment_token: payment_token })
                collection.save();

                // add tokens to user
                user.tokens = user.tokens + num_of_tokens
                user.total_purchase = user.total_purchase + num_of_tokens*token_price;
                let updatedUser = await user.save();

                const collection1 = new purchaseHistory({user_id:user_id, num_of_tokens:num_of_tokens, token_price:token_price})
                let savedDoc = await collection1.save()

                return Afterware.sendResponse(req, res, 200, {
                    status: "success",
                    data: savedDoc,
                    updatedUser: updatedUser,
                    message: "Buying operation successful",
                });
            }
            
        } catch (error) {
            console.log(error);
            return Afterware.sendResponse(req, res, 500, {
                status: "error",
                message: "Internal Server Error",
                messageDetails: error
            });
        }
    }

    static async sell(req, res) {
        try {
            const data = req.body.data;
            
            const user_id = data.user_id || "";
            const users = (await User.find({_id:user_id}))
            if(users.length != 1)
            {
                return Afterware.sendResponse(req, res, 500, {
                    status: "fail",
                    message: "User Not Exists",
                });
            }
            
            let user = users[0]
            const token_price = (await TokenHistoryController._getLatestTokenPrice()).token_price
            const num_of_tokens = data.num_of_tokens || 1;

            if(num_of_tokens > user.tokens)
            {
                return Afterware.sendResponse(req, res, 500, {
                    status: "fail",
                    message: "Tokens not sufficient"
                });
            }

            // update user
            user.acc_bal = user.acc_bal + num_of_tokens*token_price;
            user.tokens = user.tokens - num_of_tokens
            user.total_sell = user.total_sell + num_of_tokens*token_price;
            let updatedUser = await user.save();

            // add record to history
            const collection = new sellHistory({user_id:user_id, num_of_tokens:num_of_tokens, token_price:token_price})
            let savedDoc = await collection.save()

            return Afterware.sendResponse(req, res, 200, {
                status: "success",
                data: savedDoc,
                updatedUser: updatedUser,
                message: "Selling operation successful",
            });
        } catch (error) {
            console.log(error);
            return Afterware.sendResponse(req, res, 500, {
                status: "error",
                message: "Internal Server Error",
                messageDetails: error
            });
        }
    }
}

module.exports = BuySellController;