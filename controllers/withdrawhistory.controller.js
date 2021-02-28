const Afterware = require("../lib/afterware");
const Collection = require("../models/withdraw_history");
const UserCollection = require("../models/user");
// const { collection } = require("../models/withdraw_history");


class WithdrawHistoryController {

    static async create(req, res) {
        try {

            const collection = new Collection();

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
            const request_number = req.params.userId;
            if (!request_number && request_number === "") {
                return Afterware.sendResponse(req, res, 400, {
                    status: "Validation Error",
                    message: "Enter Proper request_number",
                });
            } else {
                const collections = await Collection.find({ _id: request_number });
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
                const updated = await Collection.updateOne({ _id: request_number }, req.body);
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
            const deleted = await Collection.deleteOne({ _id: request_number });
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
        const checkUser = await Collection.find({ _id: requestNumber });
        if (checkUser.length === 0) {
            return false;
        } else {
            return true;
        }
    }


    /* 
    It will find user's account balance check withdraw_request_amount according to that it will set status in withdrawhistory 
    true or false
    */
    static async StatusCheck(req, res) {

        const userId = req.params.userId;
        const request_No = req.params.request_No;


        const user = await UserCollection.find({ _id: userId });

        if (user.accountBal > req.body.withDrawal_Amount) {
            await user.UserCollection.updateOne({ accountBal: (user.accountBal - req.body.withDrawal_Amount) });
            await withdarawHistory.collection.updateOne({ _id: request_No }, { status: true });
            return Afterware.sendResponse(req, res, 200, {
                status: "success",
                message: "request is completed money is withdrawed",
            });
        } else {
            await withdarawHistory.collection.updateOne({ _id: request_No }, { status: false });
            return Afterware.sendResponse(req, res, 400, {
                status: "fail",
                message: "request is failed , not sufficient balance",
            });
        }

    }

    static async viewUserHistory(req, res) {
        try {
            const userId = req.params.userId;
            if (!userId && userId === "") {
                return Afterware.sendResponse(req, res, 400, {
                    status: "Validation Error",
                    message: "Enter Proper User",
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








}
module.exports = WithdrawHistoryController;