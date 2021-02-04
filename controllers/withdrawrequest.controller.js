const Afterware = require("../lib/afterware");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const Collection = require("../models/withdraw_request");
const { collection } = require("../models/withdraw_request");

class WithdrawRequestController {

    static async create(req, res) {
        try {
            const userId = req.body.userId;
            if (await WithdrawRequestController.requestExists(userId)) {
                return Afterware.sendResponse(req, res, 400, {
                    status: "error",
                    message: "Withdraw request already Exists",
                });
            } else {
                const collection = new Collection();
                collection.userId = req.body.userId;
                collection.name = req.body.name;
                collection.UPI = req.body.UPI;
                collection.BankAccountNumber = req.body.BankAccountNumber;
                collection.IFSC = req.body.IFSC;
                collection.total_amount = req.body.total_amount;

                collection.save();
                return Afterware.sendResponse(req, res, 200, {
                    status: "success",
                    message: "new withdraw request collection created successfully",
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
            const userId = req.params.userId;
            if (!userId && userId === "") {
                return Afterware.sendResponse(req, res, 400, {
                    status: "Validation Error",
                    message: "Enter Proper userId",
                });
            } else {
                const collections = await Collection.find({ userId: userId });
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
            const userId = req.params.userId;
            if (!userId && userId === "") {
                return Afterware.sendResponse(req, res, 400, {
                    status: "Validation Error",
                    message: "Enter Proper userId",
                });
            } else {
                const updated = await Collection.updateOne({ userId: userId }, req.body);
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
        const userId = req.params.userId;
        try {
            const deleted = await Collection.deleteOne({ userId: userId });
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

    static async requestExists(userId) {
        const checkUser = await Collection.find({ userId: userId });
        if (checkUser.length === 0) {
            return false;
        } else {
            return true;
        }
    }



}
module.exports = WithdrawRequestController;