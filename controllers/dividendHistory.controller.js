const Afterware = require("../lib/afterware");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const Collection = require("../models/dividentHistory");

class DividendHistoryController {

    static async create(req, res) {
        try {
            const dividendHistory = req.body.dividendHistory;
            const collection = new Collection();
            
            collection.date = new Date(dividendHistory.date)
            collection.dividend_id = parseInt(dividendHistory.dividend_id, 10)
            collection.user_id = dividendHistory.user_id
            collection.total_value = parseInt(dividendHistory.total_value, 10)
            collection.num_of_tokens = parseInt(dividendHistory.num_of_tokens, 10)
            collection.divident_per_token = parseInt(dividendHistory.divident_per_token, 10)
            collection.total_amount = parseInt(dividendHistory.total_amount, 10)

            if(isNaN(collection.total_amount) || 
                isNaN(collection.dividend_id) ||
                isNaN(collection.total_value) || 
                isNaN(collection.num_of_tokens) || 
                isNaN(collection.dividend_per_token) ||
                isNaN(collection.total_amount) ||
                (collection.num_of_tokens*collection.dividend_per_token!=collection.total_amount)){
                return Afterware.sendResponse(req, res, 200, {
                    status: "fail",
                    message: "Please provide proper numeric types.",
                });
            }
            collection.save();

            return Afterware.sendResponse(req, res, 200, {
                status: "success",
                message: "new dividend history collection created successfully",
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

    static async update(req, res) {
        try {
            const dividend_id = req.params.dividend_id;
            if (!dividend_id && dividend_id === "") {
                return Afterware.sendResponse(req, res, 400, {
                    status: "Validation Error",
                    message: "Enter Proper dividend_id",
                });
            } else {
                const updated = await Collection.updateOne({ dividend_id: dividend_id }, req.body);
                return Afterware.sendResponse(req, res, 200, {
                    status: "success",
                    message: `${updated.nModified} Documents modified`,
                });
            }
        } catch (error) {
            console.log(error);
            return Afterware.sendResponse(req, res, 500, {
                status: "error",
                message: "Internal Server Error",
            });
        }
    }
}

module.exports = DividendHistoryController;
