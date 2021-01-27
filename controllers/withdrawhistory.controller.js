const Afterware = require("../lib/afterware");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const Collection = require("../models/withdraw_history");
const { collection } = require("../models/withdraw_history");

class WithdrawHistoryController {

    static async create(req, res) {
        try {
            const requestNumber = req.body.request_number;
            if (await WithdrawHistoryController.historyExists(requestNumber)) {
                return Afterware.sendResponse(req, res, 400, {
                    status: "error",
                    message: "Withdraw history already Exists",
                });
            } else {
                const collection = new Collection();
                collection.request_number = req.body.request_number;
                collection.name = req.body.name;
                collection.UPI = req.body.UPI;
                collection.BankAccountNumber = req.body.BankAccountNumber;
                collection.IFSC = req.body.IFSC;
                collection.total_amount = req.body.total_amount;

                collection.save();
                return Afterware.sendResponse(req, res, 200, {
                    status: "success",
                    message: "new withdraw history collection created successfully",
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

    static async view(req, res) {
        try {
            const request_number = req.params.request_number;
            if (!request_number && request_number === "") {
                return Afterware.sendResponse(req, res, 400, {
                    status: "Validation Error",
                    message: "Enter Proper request_number",
                });
            } else {
                const collections = await Collection.find({ request_number: request_number });
                return Afterware.sendResponse(req, res, 200, {
                    status: "success",
                    data: collections,
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


    static async update(req, res) {
        try {
            const request_number = req.params.request_number;
            if (!request_number && request_number === "") {
                return Afterware.sendResponse(req, res, 400, {
                    status: "Validation Error",
                    message: "Enter Proper request_number",
                });
            } else {
                const updated = await Collection.updateOne({ request_number: request_number }, req.body);
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

    static async delete(req, res) {
        const request_number = req.params.request_number;
        try {
            const deleted = await Collection.deleteOne({ request_number: request_number });
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

    static async historyExists(requestNumber) {
        const checkUser = await Collection.find({ request_number: requestNumber });
        if (checkUser.length === 0) {
            return false;
        } else {
            return true;
        }
    }



}
module.exports = WithdrawHistoryController;