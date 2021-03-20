const Afterware = require("../lib/afterware");
let multer = require('multer')
let upload = multer().single('file')
let fs = require("fs")
const User = require("../models/user");
const Brand = require("../models/brand");

class FileUploadController {

    static async upload(req, res) {
        try {
            upload(req, res, async function (err) {
                if(!err){
                    if((req.file.mimetype || "").startsWith("image"))
                    {
                        if(req.file.size > 10*1024*1024)
                        {
                            return Afterware.sendResponse(req,res,500, {
                                status:"error",
                                data: "upload a small image file",
                            })
                        }
                        else{
                            // image is okay from here
                            const id = req.params.id || "";
                            const type = req.params.type || "user";

                            if (id == "" || (type!="brand" && type!="user")) {
                                // both should not empty
                                return Afterware.sendResponse(req, res, 400, {
                                    status: "Validation Error",
                                    message: "Enter proper id and type",
                                });
                            }
                            else{
                                if(type="user")
                                {
                                    let user = await User.find({ _id: id })
                                    if(user.length !== 1){
                                        return Afterware.sendResponse(req, res, 400, {
                                            status: "Validation Error",
                                            message: "No User Exists",
                                        });
                                    }
                                    else{
                                        user = user[0]

                                        let path = user._id || "User_" + new Date().getTime().toString()
                                        path = "uploads/" + path
                                        fs.writeFileSync(path, req.file.buffer);

                                        user.userImg = "/static/" + path
                                        let savedDoc = await user.save()

                                        return Afterware.sendResponse(req,res,200, {
                                            status:"success",
                                            data: savedDoc
                                        })
                                    }
                                }
                                else{
                                    // type is brand
                                    let brand = await Brand.find({ _id: id })
                                    if(brand.length !== 1){
                                        return Afterware.sendResponse(req, res, 400, {
                                            status: "Validation Error",
                                            message: "No Brand Exists",
                                        });
                                    }
                                    else{
                                        brand = brand[0]

                                        let path = "Brand_Image_" + new Date().getTime().toString()
                                        path = "uploads/" + path
                                        fs.writeFileSync(path, req.file.buffer);

                                        brand.brandImg = "/static/" + path
                                        let savedDoc = await brand.save()

                                        return Afterware.sendResponse(req,res,200, {
                                            status:"success",
                                            data: savedDoc
                                        })
                                    }
                                }
                            }
                        }
                    }
                    else{
                        return Afterware.sendResponse(req,res,500, {
                            status:"error",
                            data: "upload an image file",
                        })
                    }
                }
            })
        }
        catch (error) {
            console.log(error);
            return Afterware.sendResponse(req, res, 500, {
                status: "error",
                message: "Internal Server Error",
            });
        }
    }
}

module.exports = FileUploadController;