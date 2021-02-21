const Afterware = require("../lib/afterware");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const Collection = require("../models/sell");

class SellHistoryController {

    static async create(req, res) {
        try {
            const sellHistory = req.body.sellHistory;
            const collection = new Collection();
            
            collection.date = new Date(sellHistory.date)
            collection.pur_id = parseInt(sellHistory.pur_id, 10)
            collection.user_acc_num = parseInt(sellHistory.user_acc_num, 10)
            collection.num_of_tokens = parseInt(sellHistory.num_of_tokens, 10)
            collection.token_price = parseInt(sellHistory.token_price, 10)
            collection.total_price = parseInt(sellHistory.total_price, 10)

            if(isNaN(collection.total_revenue) || 
                isNaN(collection.operating_expenses) ||
                isNaN(collection.interest_and_taxes) || 
                isNaN(collection.total_number_of_tokens) ||
                (collection.num_of_tokens*collection.token_price!=collection.token_price)){
                return Afterware.sendResponse(req, res, 200, {
                    status: "fail",
                    message: "Please provide proper numeric types.",
                });
            }
            collection.save();

            return Afterware.sendResponse(req, res, 200, {
                status: "success",
                message: "new sell history collection created successfully",
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

    static async delete(req,res){
        const id = req.params.id;
        try {
            const deleted = await Collection.deleteOne({ _id: id });
            return Afterware.sendResponse(req, res, 200, {
                status: deleted.ok == "1" ? "success" : "fail",
                message: deleted.deletedCount,
            });
        } catch (error) {
            return Afterware.sendResponse(req, res, 500, {
                status: "error",
                message: "Internal Server Error",
            });
        }
    }

    static async update(req,res){
        try {
            const id = req.params.id;
            if (!id && id === "") {
                return Afterware.sendResponse(req, res, 400, {
                    status: "Validation Error",
                    message: "Enter Proper input",
                });
            } else {
                const updated = await Collection.updateOne({ _id: id }, req.body);
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

module.exports = SellHistoryController;
