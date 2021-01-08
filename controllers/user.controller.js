const Afterware = require("../lib/afterware");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const Collection = require("../models/user");

class UserController {

    static async create(req, res) {
        try {

            const userEmail = req.body.email;
            if (!(await UserController.userExists(userEmail))) {
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
                await Collection.updateOne({ _id: userId }, {
                    username: req.body.username,
                    gender: req.body.gender,
                    email: req.body.email,
                    password: req.body.password,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    mobileNo: req.body.mobileNo,
                    homeAddress: req.body.homeAddress,
                    city: req.body.city,
                    state: req.body.state,
                    zipcode: req.body.zipcode,
                    country: req.body.country,
                    UPI: req.body.UPI,
                    bankAccountNo: req.body.bankAccountNo,
                    IFSC: req.body.IFSC,
                    DOB: req.body.DOB,
                    userImg: req.body.userImg,
                    aadharCardNo: req.body.aadharCardNo,
                });
            }
            return Afterware.sendResponse(req, res, 200, {
                status: "success",
                message: "userloyee Data updated successfully",
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
    static async userExists(userEmail) {
        const checkUser = await Collection.find({ email: userEmail });
        if (checkUser.length === 0) {
            return true;
        } else {
            return false;
        }
    }
    static async userCheck(req, res) {
        const mobileNo = req.params.mobileNo;
        console.log(mobileNo)
        const checkUser = await Collection.find({ mobileNo: mobileNo });
        // if (checkUser.length === 0) {
        //     return true;
        // } else {
        //     return false;
        // }
        return Afterware.sendResponse(req, res, 200, {
            status: "success",
            messageCode: checkUser.length !== 0,
            message: (checkUser.length !== 0) ? "Already Exist" : "User NOT exist"
        });
    }

    static async viewWithMobileNO(req, res) {
        try {
            const mobileNO = req.params.mobileNO;
            if (!mobileNO && mobileNO === "") {
                return Afterware.sendResponse(req, res, 400, {
                    status: "Validation Error",
                    message: "Enter Proper mobileNO",
                });
            } else {
                const collections = await Collection.find({ mobileNo: mobileNO });
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
module.exports = UserController;