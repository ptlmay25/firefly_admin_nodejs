const Afterware = require("../lib/afterware");
const Collection = require("../models/user");

class UserController {

    static async create(req, res) {
        try {


            const userMobile = req.body.mobileNo;
            if (await UserController.userExists(userMobile)) {
                return Afterware.sendResponse(req, res, 400, {
                    status: "error",
                    message: "user already Exists",
                });
            } else {
                const collection = new Collection();
                collection.username = req.body.username;
                collection.gender = req.body.gender;
                collection.email = req.body.email;
                collection.password = req.body.password;
                collection.firstName = req.body.firstName;
                collection.lastName = req.body.lastName;
                collection.mobileNo = req.body.mobileNo;
                collection.homeAddress = req.body.homeAddress;
                collection.city = req.body.city;
                collection.state = req.body.state;
                collection.zipcode = req.body.zipcode;
                collection.country = req.body.country;
                collection.UPI = req.body.UPI;
                collection.bankAccountNo = req.body.bankAccountNo;
                collection.IFSC = req.body.IFSC;
                collection.DOB = req.body.DOB;
                collection.userImg = req.body.userImg;
                collection.aadharCardNo = req.body.aadharCardNo;
                collection.total_dividend = req.body.total_dividend;
                collection.save();
                return Afterware.sendResponse(req, res, 200, {
                    status: "success",
                    message: "new user collection created successfully",
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
                const updated = await Collection.updateOne({ _id: userId }, req.body);
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
                const collections = await Collection.find({ _id: userId });
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

    static async userExists(userMobile) {
        const checkUser = await Collection.find({ mobileNo: userMobile });
        if (checkUser.length === 0) {
            return false;
        } else {
            return true;
        }
    }

    static async userCheck(req, res) {
        const mobileNo = req.params.mobileNo;
        const checkUser = await Collection.find({ mobileNo: mobileNo });
        return Afterware.sendResponse(req, res, 200, {
            status: "success",
            messageCode: checkUser.length !== 0,
            message: (checkUser.length !== 0) ? "Already Exist" : "User NOT exist"
        });
    }

    static async viewWithMobileNO(req, res) {
        try {
            const mobileNo = req.params.mobileNo;
            if (!mobileNo && mobileNo === "") {
                return Afterware.sendResponse(req, res, 400, {
                    status: "Validation Error",
                    message: "Enter Proper mobileNO",
                });
            } else {
                const collections = await Collection.find({ mobileNo: mobileNo });

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
        const mobileNo = req.params.mobileNo;
        try {
            const deleted = await Collection.deleteOne({ mobileNo: mobileNo });
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
}
module.exports = UserController;