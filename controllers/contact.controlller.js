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

            // collection.date = new Date(Contact.date)
            collection.BankAccountNumber = req.body.BankAccountNumber;
            collection.name = req.body.name;
            collection.email = req.body.email;
            collection.message = req.body.message;
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

}

module.exports = ContactController;