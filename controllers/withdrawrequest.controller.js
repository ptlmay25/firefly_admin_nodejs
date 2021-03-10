const Afterware = require("../lib/afterware");
const Collection = require("../models/withdraw_request");
const HistoryCollection = require("../models/withdraw_history");
const UserCollection = require("../models/user");
const user = require("../models/user");



class WithdrawRequestController {

    static async create(req, res) {
        try {
            const collection = new Collection();
            collection.userId = req.body.userId;
            collection.name = req.body.name;
            collection.UPI = req.body.UPI;
            collection.BankAccountNumber = req.body.BankAccountNumber;
            collection.IFSC = req.body.IFSC;
            collection.total_amount = req.body.total_amount;
            collection.Account_Balance = req.body.Account_Balance;

            collection.save();
            return Afterware.sendResponse(req, res, 200, {
                status: "success",
                message: "new withdraw request collection created successfully",
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
        // Send data with false flag
    static async view(req, res) {
        try {
            const request_No = req.params.request_No;
            if (!request_No && request_No === "") {
                return Afterware.sendResponse(req, res, 400, {
                    status: "Validation Error",
                    message: "Enter Proper request_No",
                });
            } else {
                const collections = await Collection.find({ $and: [{ _id: request_No }, { Status: false }] });
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
            const request_No = req.params.request_No;
            if (!request_No && request_No === "") {
                return Afterware.sendResponse(req, res, 400, {
                    status: "Validation Error",
                    message: "Enter Proper request_No",
                });
            } else {
                const updated = await Collection.updateOne({ _id: request_No }, req.body);
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
        const request_No = req.params.request_No;
        try {
            const deleted = await Collection.deleteOne({ _id: request_No });
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


    static async viewUserRequests(req, res) {
        try {
            const userId = req.params.userId;
            console.log(userId)
            if (!userId && userId === "") {
                return Afterware.sendResponse(req, res, 400, {
                    status: "Validation Error",
                    message: "Enter Proper user",
                });
            } else {
                const collections = await Collection.find({ userId: userId, Status: true });
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


    static async statusCheck(req, res) {
        const request_No = req.params.request_No;
        const userId = req.params.userId;
        console.log(userId);
        const user = await UserCollection.find({ _id: userId });
        console.log("User Data" + user);
        console.log("Requested Amount" + req.body.total_amount);
        console.log("User Balance" + user[0].acc_bal);

        console.log("User Balance" + user[0]._id);
        if (user[0].acc_bal > req.body.total_amount) {
            await UserCollection.updateOne({ _id: user[0]._id }, { acc_bal: (user[0].acc_bal - req.body.total_amount) });
            await Collection.updateOne({ _id: request_No }, { Status: true }); //replace with withdrawrequest
            return Afterware.sendResponse(req, res, 200, {
                status: "success",
                message: "request is completed money is withdrawed",
            });
        } else {
            await Collection.updateOne({ _id: request_No }, { Status: false });
            return Afterware.sendResponse(req, res, 400, {
                status: "fail",
                message: "request is failed , not sufficient balance",
            });
        }

    }



}
module.exports = WithdrawRequestController;