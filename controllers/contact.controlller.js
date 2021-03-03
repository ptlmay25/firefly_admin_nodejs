const Afterware = require("../lib/afterware");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const Collection = require("../models/contact");

class ContactController {

    static async create(req, res) {
        try {

            const collection = new Collection();

            collection.BankAccountNumber = req.body.BankAccountNumber;
            collection.name = req.body.name;
            collection.email = req.body.email;
            collection.message = req.body.message;
            collection.userId = req.body.userId;

            collection.save();

            return Afterware.sendResponse(req, res, 200, {
                status: "success",
                message: "new contact collection created successfully",
            });
        } catch (error) {
            console.log(error);
            return Afterware.sendResponse(req, res, 500, {
                status: "error",
                message: "Internal Server Error",
            });
        }
    }

    static async viewRequest(req, res) {
        try {
            const collections = await Collection.find({ Solved: false });
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
    static async viewHistory(req, res) {
        try {
            const collections = await Collection.find({ Solved: true });
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
    static async Solved(req, res) {
        //flag var should be true
    }

}

module.exports = ContactController;