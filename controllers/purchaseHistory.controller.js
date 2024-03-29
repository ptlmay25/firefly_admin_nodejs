const Afterware = require("../lib/afterware");
const Collection = require("../models/purchase");
const User = require("../models/user")
const TokenHistoryController = require("../controllers/tokenhistory.controller")

class PurchaseHistoryController {

    static async create(req, res) {
        try {
            const purchaseHistory = req.body.purchaseHistory;

            const user_id = purchaseHistory.user_id || "";
            const users = (await User.find({ _id: user_id }))
            if (users.length != 1) {
                return Afterware.sendResponse(req, res, 200, {
                    status: "fail",
                    message: "User Not Exists",
                });
            }
            user_id = users[0]._id;

            const token_price = (await TokenHistoryController._getLatestTokenPrice()).token_price
            const num_of_tokens = purchaseHistory.num_of_tokens || 1;

            const collection = new Collection({ user_id: user_id, num_of_tokens: num_of_tokens, token_price: token_price })
            let savedDoc = await collection.save()
            return Afterware.sendResponse(req, res, 200, {
                status: "success",
                message: "new purchase history collection created successfully",
                data: savedDoc
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
            const collections = await Collection.find({}).sort({date: -1});
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
    static async viewUser(req, res) {
        try {
            const user_id = req.params.user_id;
            if (!user_id && user_id === "") {
                return Afterware.sendResponse(req, res, 400, {
                    status: "Validation Error",
                    message: "Enter Proper user_id",
                });
            } else {
                const collections = await Collection.find({ user_id: user_id }).sort({date: -1});
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


    static async delete(req, res) {
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

    static async update(req, res) {
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

module.exports = PurchaseHistoryController;