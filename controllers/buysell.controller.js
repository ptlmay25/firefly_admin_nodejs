const Afterware = require("../lib/afterware");
const Token = require("../models/token");
const TokenController = require("./tokenhistory.controller");
const User = require("../models/user");
const UserController = require("./user.controller");

class BuySellController {

    static async buy(req, res) {
        try {
            // Buy tokens
            // will get userid and token
            // validate
            // add in pur history
            // udpate user 
            return Afterware.sendResponse(req, res, 200, {
                status: "success",
                data: savedDoc,
                message: "new token history collection created successfully",
            });
        } catch (error) {
            console.log(error);
            return Afterware.sendResponse(req, res, 500, {
                status: "error",
                message: "Internal Server Error",
                messageDetails: error
            });
        }
    }

    static async sell(req, res) {
        try {
            // TODO
        } catch (error) {
            console.log(error);
            return Afterware.sendResponse(req, res, 500, {
                status: "error",
                message: "Internal Server Error",
                messageDetails: error
            });
        }
    }
}

module.exports = BuySellController;