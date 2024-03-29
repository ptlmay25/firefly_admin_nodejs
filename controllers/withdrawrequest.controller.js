const Afterware = require("../lib/afterware");
const Collection = require("../models/withdraw_request");
const HistoryCollection = require("../models/withdraw_history");
const User = require("../models/user");



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
            collection.Status = false

            const user_id = req.body.userId || "";
            const users = (await User.find({ _id: user_id }))
            if (users.length != 1) {
                return Afterware.sendResponse(req, res, 500, {
                    status: "fail",
                    message: "User Not Exists",
                });
            }
            else{
                let user = users[0]
                let acc_bal = user.acc_bal;
                if (acc_bal > req.body.total_amount)
                {
                    await User.updateOne({ _id: user._id }, { acc_bal: (acc_bal - req.body.total_amount) });
                    collection.save();
                    return Afterware.sendResponse(req, res, 200, {
                        status: "success",
                        message: "new withdraw request collection created successfully",
                    });
                }
                else{
                    return Afterware.sendResponse(req, res, 500, {
                        status: "error",
                        message: "Not sufficient balance for withdrawal",
                    });
                }
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
            const collections = await Collection.find({}).sort({createdAt: -1});
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
            const request_No = req.params.request_No;
            if (!request_No && request_No === "") {
                return Afterware.sendResponse(req, res, 400, {
                    status: "Validation Error",
                    message: "Enter Proper request_No",
                });
            } else {
                const collections = await Collection.find({ _id: request_No });
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
                const collections = await Collection.find({ userId: userId}).sort({createdAt: -1});
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

        if((await Collection.find({ _id: request_No })).length!=1)
        {
            return Afterware.sendResponse(req, res, 200, {
                status: "success",
                message: "No such withdraw request exists with id: " + request_No.toString(),
            });
        }
        else{
            await Collection.updateOne({ _id: request_No }, { Status: true });
            return Afterware.sendResponse(req, res, 200, {
                status: "success",
                message: "request is completed money is withdrawed",
            });
        }
    }

}
module.exports = WithdrawRequestController;