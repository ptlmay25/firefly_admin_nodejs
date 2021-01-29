const Afterware = require("../lib/afterware");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const Collection = require("../models/token");

class TokenHistoryController {

    static async create(req, res) {
        try {
            const SERVICE_FEE = 0.15
            const tokenHistory = req.body.tokenHistory;
            const collection = new Collection();
            
            if(!tokenHistory.month_year || !tokenHistory.upload_date)
            {
                return Afterware.sendResponse(req, res, 200, {
                    status: "fail",
                    message: "Please provide month_year and upload date both.",
                });
            }
            
            collection.month_year = tokenHistory.month_year
            collection.upload_date = tokenHistory.upload_date

            collection.total_revenue = parseInt(tokenHistory.total_revenue, 10)
            collection.operating_expenses = parseInt(tokenHistory.operating_expenses, 10)
            collection.interest_and_taxes = parseInt(tokenHistory.interest_and_taxes, 10)
            collection.total_number_of_tokens = parseInt(tokenHistory.total_number_of_tokens, 10)
            
            if(isNaN(collection.total_revenue) || 
                isNaN(collection.operating_expenses) ||
                isNaN(collection.interest_and_taxes) || 
                isNaN(collection.total_number_of_tokens)){
                return Afterware.sendResponse(req, res, 200, {
                    status: "fail",
                    message: "Please provide proper numeric types.",
                });
            }
        
            let service_fee = collection.total_revenue*SERVICE_FEE
            if (service_fee!=parseInt(tokenHistory.service_fee)){
                return Afterware.sendResponse(req, res, 200, {
                    status: "fail",
                    message: "Service Fee Calculation is incorrect.",
                });
            }
            collection.service_fee = service_fee

            let net_profit = collection.total_revenue - collection.operating_expenses - collection.interest_and_taxes - collection.service_fee
            if (net_profit<0 || net_profit!=parseInt(tokenHistory.net_profit)){
                return Afterware.sendResponse(req, res, 200, {
                    status: "fail",
                    message: "Net Profit Calculation is incorrect.",
                });
            }
            collection.net_profit = net_profit

            let divident_per_token = 0
            if(collection.total_number_of_tokens>0){
                divident_per_token = collection.net_profit/collection.total_number_of_tokens;
            }
            if (divident_per_token!=parseInt(tokenHistory.divident_per_token)){
                return Afterware.sendResponse(req, res, 200, {
                    status: "fail",
                    message: "Divident/token Calculation is incorrect.",
                });
            }
            collection.divident_per_token = divident_per_token
            collection.save();

            return Afterware.sendResponse(req, res, 200, {
                status: "success",
                message: "new token history collection created successfully",
            });
        } catch (error) {
            console.log(error);
            return Afterware.sendResponse(req, res, 500, {
                status: "error",
                message: "Internal Server Error",
            });
        }
    }
    
    static async viewAll(req, res) {
        try {
            const collections = await Collection.find({});
            return Afterware.sendResponse(req, res, 200, {
                status: "success",
                data: collections,
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

module.exports = TokenHistoryController;
