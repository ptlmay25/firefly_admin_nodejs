const Collection = require("../models/brand");
const Afterware = require("../lib/afterware");
let multer = require('multer')
let upload = multer().single('file')
let fs = require("fs")

class BrandController {

    static async create(req, res) {
        try {
            upload(req, res, async function (err) {
                if(!err){
                    if( req && req.file && (req.file.mimetype || "").startsWith("image"))
                    {
                        if(req.file.size > 3*1024*1024)
                        {
                            return Afterware.sendResponse(req,res,500, {
                                status:"error",
                                data: "upload a small image file",
                            })
                        }
                        else{
                            const collection = new Collection();
                            collection.brandName = req.body.brandName;
                            collection.year = req.body.year;
                            collection.noOfProduct = req.body.noOfProduct;
                            collection.avgRevenue = req.body.avgRevenue;
                            collection.city = req.body.city;
                            collection.country = req.body.country;
                            collection.about = req.body.about;

                            let path = (collection.brandName || "Brand_Image") + "_" + new Date().getTime().toString() 
                            path = "uploads/" + path
                            fs.writeFileSync(path, req.file.buffer);
                            collection.brandImg = "/static/" + path

                            let savedDoc = await collection.save();

                            return Afterware.sendResponse(req, res, 200, {
                                status: "success",
                                message: "new brand collection created successfully",
                                savedDoc: savedDoc
                            });
                        }
                    }
                    else{
                        return Afterware.sendResponse(req,res,500, {
                            status:"error",
                            data: "upload an image file",
                        })
                    }
                }
                else{
                    return Afterware.sendResponse(req,res,500, {
                        status:"error",
                        data: "upload an proper image file",
                    })
                }
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