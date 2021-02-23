const Afterware = require("../lib/afterware");
const Collection = require("../models/deposit");
const User = require("../models/user")

class DepositHistoryController {

    static async create(req, res) {
        try {
            const depositHistory = req.body.depositHistory;
            
            const user_id = depositHistory.user_id || "";
            const total_amount = parseInt(depositHistory.total_amount,10) || 0
            const users = (await User.find({_id:user_id}))
            if(users.length != 1)
            {
                return Afterware.sendResponse(req, res, 500, {
                    status: "fail",
                    message: "User Not Exists",
                });
            }
            let user = users[0]
            depositHistory.user_id = user._id;

            user.acc_bal = user.acc_bal - total_amount;
            user.save();

            const collection = new Collection(depositHistory)
            let savedDoc = await collection.save()
            return Afterware.sendResponse(req, res, 200, {
                status: "success",
                message: "new deposit history collection created successfully",
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
                return Afterware.sendResponse(req, res, 500, {
                    status: "Validation Error",
                    message: "Enter Proper input",
                });
            } else {
                if(req.body.user_id){
                    delete req.body.user_id; // don't allow to update the user
                }
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

module.exports = DepositHistoryController;
