const Afterware = require("../lib/afterware");
const token = require("../models/token");
const Collection = require("../models/token");
const UserController = require("./user.controller");

class TokenHistoryController {

    static async create(req, res) {
        try {
            const SERVICE_FEE = 0.15
            const tokenHistory = req.body.data;
            
            // check all required fields
            const validated = await TokenHistoryController.validate(tokenHistory)
            if (!validated)
            {
                return Afterware.sendResponse(req, res, 200, {
                    status: "error",
                    message: "provide all required fields with correct datatype.",
                });
            }
            
            for(key in ["total_revenue","operating_expenses","interest_and_taxes","service_fee","net_profit"])
            {
                tokenHistory[key] = parseInt(tokenHistory[key],10)
                if(tokenHistory[key] == NaN){
                    tokenHistory[key] = 0
                }
            }

            // validating
            if(
                tokenHistory["total_revenue"]<=0 ||
                tokenHistory["operating_expenses"]<=0 ||
                tokenHistory["interest_and_taxes"]<=0 ||
                tokenHistory["service_fee"]<=0 ||
                tokenHistory["net_profit"]<=0 ||
                tokenHistory["service_fee"] != SERVICE_FEE*tokenHistory["total_revenue"] || 
                tokenHistory["net_profit"] != (tokenHistory["total_revenue"] - tokenHistory["operating_expenses"] - tokenHistory["interest_and_taxes"] - tokenHistory["service_fee"])
            )
            {
                return Afterware.sendResponse(req, res, 200, {
                    status: "error",
                    message: "calculation error. Please try with correct values.",
                });
            }

            const token_price = TokenHistoryController.getLatestTokenPrice();
            const total_number_of_tokens = TokenHistoryController.getTotalNumberOfTokens();

            
            const collection = new Collection(tokenHistory);
            
            return Afterware.sendResponse(req, res, 200, {
                status: "success",
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

    static async delete(req,res){

    }

    static async update(req,res){

    }

    static async getLatestTokenPrice(req,res){

    }

    static async validate(data){
        const requiredFields = ["total_revenue","operating_expenses","interest_and_taxes","service_fee","net_profit"]
        const validated = requiredFields.every(key=>key in data)
        console.log(validated)
        return validated
    }
}

module.exports = TokenHistoryController;