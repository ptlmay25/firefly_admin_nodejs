const Afterware = require("../lib/afterware");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const TokenCollection = require("../models/token");
const PurchaseHistoryCollection = require("../models/purchase");
const SellHistoryCollection = require("../models/sell");
const WithdrawRequestCollection = require("../models/withdraw_request");
const UserCollection = require("../models/user");

class DashboardController {
    static async getData(req, res) {
        try {
            const purchaseHistoryCollection = await PurchaseHistoryCollection.find({});
            const withdrawRequestCollection = await WithdrawRequestCollection.find({});
            const sellHistoryCollection = await SellHistoryCollection.find({});
            const userCollection = await UserCollection.find({});

            let totalPurchasedTokens = 0
            let totalPurchasedTokenAmount = 0
            purchaseHistoryCollection.forEach(element => {
                totalPurchasedTokens += element.num_of_tokens
                totalPurchasedTokenAmount += element.total_price 
            });

            let totalSoldTokens = 0
            let totalSoldTokenAmount = 0
            sellHistoryCollection.forEach(element => {
                totalSoldTokens += element.num_of_tokens
                totalSoldTokenAmount += element.total_price 
            });

            let totalWithdrawAmount = 0
            withdrawRequestCollection.forEach(element => {
                totalWithdrawAmount += element.total_amount
            })

            const collection = {
                users: userCollection.length,
                token_price: 1000,
                purchase: {
                    total_tokens: totalPurchasedTokens,
                    amount: totalPurchasedTokenAmount
                },
                sold: {
                    total_tokens: totalSoldTokens,
                    amount: totalSoldTokenAmount
                },   
                withdrawRequest: {
                    requests: withdrawRequestCollection.length,
                    amount: totalWithdrawAmount,
                },
                hotels: {
                    brands: 0,
                    rooms: 0
                },            
            }

            return Afterware.sendResponse(req, res, 200, {
                status: "success",
                data: collection,
            });
        } catch (error) {
            return Afterware.sendResponse(req, res, 500, {
                status: "error",
                message: "Internal Server Error",
            });
        }
    }
}

module.exports = DashboardController;