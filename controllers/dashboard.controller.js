const Afterware = require("../lib/afterware");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const TokenHistoryController = require("./tokenhistory.controller");
const PurchaseHistoryCollection = require("../models/purchase");
const SellHistoryCollection = require("../models/sell");
const WithdrawRequestCollection = require("../models/withdraw_request");
const UserCollection = require("../models/user");
const RetailerCollection = require("../models/retailer")
const BrandCollection = require("../models/brand");

class DashboardController {
    static async getData(req, res) {
        try {
            const purchaseHistoryCollection = await PurchaseHistoryCollection.find({});
            const withdrawRequestCollection = await WithdrawRequestCollection.find({});
            const sellHistoryCollection = await SellHistoryCollection.find({});
            const userCollection = await UserCollection.find({});
            const retailerCollection = await RetailerCollection.find({});
            const brandCollection = await BrandCollection.find({});

            let totalPurchasedTokens = 0
            let totalPurchasedTokenAmount = 0
            purchaseHistoryCollection.forEach(element => {
                if(element.num_of_tokens && element.token_price) {
                    totalPurchasedTokens += element.num_of_tokens
                    totalPurchasedTokenAmount += element.token_price * element.num_of_tokens 
                }
            });

            let totalSoldTokens = 0
            let totalSoldTokenAmount = 0
            sellHistoryCollection.forEach(element => {
                if(element.num_of_tokens && element.token_price) {
                    totalSoldTokens += element.num_of_tokens
                    totalSoldTokenAmount += element.token_price * element.num_of_tokens 
                }
            });

            let totalWithdrawAmount = 0
            let numOfRequests = 0
            withdrawRequestCollection.forEach(element => {
                if(element.Status === false && element.total_amount) {        
                    totalWithdrawAmount += element.total_amount
                    numOfRequests += 1
                }
            })

            let numOfProducts = 0
            brandCollection.forEach(element => {
                numOfProducts += element.noOfProduct
            })

            const token_price = (await TokenHistoryController._getLatestTokenPrice()).token_price

            const collection = {
                users: userCollection.length,
                partners: retailerCollection.length,
                token_price: token_price,
                purchase: {
                    total_tokens: totalPurchasedTokens,
                    amount: totalPurchasedTokenAmount
                },
                sold: {
                    total_tokens: totalSoldTokens,
                    amount: totalSoldTokenAmount
                },   
                withdrawRequest: {
                    requests: numOfRequests,
                    amount: totalWithdrawAmount,
                },
                business: {
                    brands: brandCollection.length,
                    products: numOfProducts
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