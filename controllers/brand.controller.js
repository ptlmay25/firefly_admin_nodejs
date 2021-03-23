const Collection = require("../models/brand");
const Afterware = require("../lib/afterware");

class BrandController {

    static async create(req, res) {
        try {
            let collection = new Collection();
            collection.brandName = req.body.brandName;
            collection.year = req.body.year;
            collection.noOfProduct = req.body.noOfProduct;
            collection.avgRevenue = req.body.avgRevenue;
            collection.city = req.body.city;
            collection.country = req.body.country;
            collection.about = req.body.about;
            collection.brandImg = req.body.brandImg || "https://firebasestorage.googleapis.com/v0/b/salersclub.appspot.com/o/brand%2FIMG-20210323-WA0011.jpg?alt=media&token=4ad64fa9-e003-417e-b6bc-e9910b63225d";

            let savedDoc = await collection.save();

            return Afterware.sendResponse(req, res, 200, {
                status: "success",
                message: "new brand collection created successfully",
                savedDoc: savedDoc
            })
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
            const Id = req.params.Id;
            const collections = await Collection.find({ _id: Id });
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
    static async update(req, res) {
        try {
            const Id = req.params.Id;
            if (!Id && Id === "") {
                return Afterware.sendResponse(req, res, 400, {
                    status: "Validation Error",
                    message: "Enter Proper Id",
                });
            } else {
                const updated = await Collection.updateOne({ _id: Id }, req.body);
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
    static async delete(req, res) {
        const Id = req.params.Id;
        try {
            const deleted = await Collection.deleteOne({ _id: Id });
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

module.exports = BrandController;