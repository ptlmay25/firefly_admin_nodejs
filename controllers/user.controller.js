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
    static async userExists(userEmail) {
        const checkUser = await Collection.find({ email: userEmail });
        if (checkUser.length === 0) {
            return true;
        } else {
            return false;
        }
    }
}
module.exports = UserController;