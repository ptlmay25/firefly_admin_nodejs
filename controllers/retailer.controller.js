const Afterware = require("../lib/afterware");
const Collection = require("../models/retailer");

class RetailerController {
    static async create(req, res) {
        try {
            const collection = new Collection();
            collection.email = req.body.email;
            collection.name = req.body.name;
            collection.mobileNo = req.body.mobileNo;
            collection.aadharCardNo = req.body.aadharCardNo;
            collection.panCardNo = req.body.panCardNo;
            collection.city = req.body.city;
            collection.state = req.body.state;
            collection.zipcode = req.body.zipcode;
            collection.storeName = req.body.storeName;
            collection.storeAddress = req.body.storeAddress;
            collection.gstNumber = req.body.gstNumber;
            collection.storeCategory = req.body.storeCategory;
            collection.storeZipCode = req.body.storeZipCode;
            collection.totalArea = req.body.totalArea;
            collection.numberOfStores = req.body.numberOfStores;
            collection.storeImage = req.body.storeImg;

            collection.save();
            return Afterware.sendResponse(req, res, 200, {
                status: "success",
                message: "new retailer collection created successfully",
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
}

module.exports = RetailerController;