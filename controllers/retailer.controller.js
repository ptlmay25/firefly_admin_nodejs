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
            collection.storeImg = req.body.storeImg || "https://firebasestorage.googleapis.com/v0/b/salersclub.appspot.com/o/brand%2FIMG-20210323-WA0011.jpg?alt=media&token=4ad64fa9-e003-417e-b6bc-e9910b63225d";

            let savedDoc = await collection.save();
            
            return Afterware.sendResponse(req, res, 200, {
                status: "success",
                message: "new retailer collection created successfully",
                savedDoc: savedDoc
            });
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
            const id = req.params.id;
            if (!id && id === "") {
                return Afterware.sendResponse(req, res, 400, {
                    status: "Validation Error",
                    message: "Enter Proper userId",
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
            const id = req.params.id;
            if (!id && id === "") {
                return Afterware.sendResponse(req, res, 400, {
                    status: "Validation Error",
                    message: "Enter Proper id",
                });
            } else {
                const collections = await Collection.find({ _id: id });
                return Afterware.sendResponse(req, res, 200, {
                    status: "success",
                    data: collections,
                });
            }
        } catch(error) {
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