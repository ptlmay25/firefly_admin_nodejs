const Afterware = require("../lib/afterware");
const Collection = require("../models/token");
const UserCollection = require("../models/user");
const UserController = require("./user.controller");

class TokenHistoryController {

    static async create(req, res) {
        try {
            const tokenHistory = req.body.data;
            
            // check all required fields
            const validated = await TokenHistoryController.validate(tokenHistory)
            if (!validated)
            {
                return Afterware.sendResponse(req, res, 500, {
                    status: "error",
                    message: "provide all required fields with correct datatype.",
                });
            }
            
            for(let key in ["total_revenue","operating_expenses","interest_and_taxes","net_profit"])
            {
                tokenHistory[key] = parseInt(tokenHistory[key],10)
                if(tokenHistory[key] == NaN){
                    tokenHistory[key] = 0
                }
            }

            // validating
            if(
                tokenHistory["total_revenue"]<0 ||
                tokenHistory["operating_expenses"]<0 ||
                tokenHistory["interest_and_taxes"]<0 ||
                tokenHistory["net_profit"]<0 || 
                tokenHistory["net_profit"] != (0.5*(tokenHistory["total_revenue"] - tokenHistory["operating_expenses"] - tokenHistory["interest_and_taxes"]))
            )
            {
                return Afterware.sendResponse(req, res, 500, {
                    status: "error",
                    message: "calculation error. Please try with correct values.",
                });
            }

            const total_number_of_tokens = await TokenHistoryController._getNumberOfTokens() || 1;
            const token_price = (await TokenHistoryController._getLatestTokenPrice()).token_price

            let divident = (tokenHistory["net_profit"] || 0)/total_number_of_tokens;
            let new_token_price = token_price + divident
            
            tokenHistory["total_number_of_tokens"] = total_number_of_tokens;
            tokenHistory["token_price"] = new_token_price;

            const collection = new Collection(tokenHistory);
            const savedDoc = await collection.save()

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

    static async view(req, res) {
        try {
            const tokenId = req.params.id;
            if (!tokenId || tokenId === "") {
                return Afterware.sendResponse(req, res, 500, {
                    status: "Validation Error",
                    message: "Enter Proper inputs",
                });
            } else {
                const collections = await Collection.find({ _id: tokenId });
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

    static async viewAll(req, res) {
        try {
            const collections = await Collection.find({}).sort({token_date: -1, token_price: -1});
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

    static async getLatestTokenPrice(req,res){
        try{
            let latestTokenPrice = await TokenHistoryController._getLatestTokenPrice();
            return Afterware.sendResponse(req, res, 200, {
                status: "success",
                data: latestTokenPrice,
            });
        }
        catch(error){
            console.log(error)
            return Afterware.sendResponse(req, res, 500, {
                status: "error",
                message: "Internal Server Error",
            });
        }
    }

    static async validate(data){
        const requiredFields = ["total_revenue","operating_expenses","interest_and_taxes","net_profit"]
        const validated = requiredFields.every(key=>key in data)
        return validated
    }

    static async _getLatestTokenPrice(){
        const DEFAULT_PRICE = 1000;
        let latestPrice = {
            token_date: null,
            token_price: DEFAULT_PRICE
        }
        try{
            const latestPriceArray =  await Collection.find().sort({token_date: -1, token_price: -1}).limit(1);
            if(latestPriceArray.length==1)
            {
                latestPrice = latestPriceArray[0];
            }
            if(latestPrice.token_price==undefined || latestPrice.token_price==0)
            {
                latestPrice.token_price = DEFAULT_PRICE;
            }
            return latestPrice
        }
        catch(error){
            console.log(error)
            return {
                token_date: null,
                token_price: DEFAULT_PRICE
            }
        };
    }
    
    static async getNumberOfTokens(req,res){
        try{
            let NumberOfTokens = await TokenHistoryController._getNumberOfTokens()
            return Afterware.sendResponse(req, res, 200, {
                status: "success",
                data: NumberOfTokens,
            });
        }
        catch(error){
            console.log(error)
            return Afterware.sendResponse(req, res, 500, {
                status: "error",
                message: "Internal Server Error",
            });
        }
    }

    static async _getNumberOfTokens(){
        try{
            let NumberOfTokens = await UserCollection.aggregate([{ $group: { _id: null, tokens: { $sum: "$tokens" }}}]);
            NumberOfTokens = NumberOfTokens[0].tokens
            return NumberOfTokens || 0; 
        }
        catch(error){
            console.log(error)
            return 0;
        }
    }
}

module.exports = TokenHistoryController;