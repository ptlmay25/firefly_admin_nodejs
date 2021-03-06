const Afterware = require("../lib/afterware");
let multer = require('multer')
let upload = multer().single('file')
let fs = require("fs")
const User = require("../models/user");

class FileUploadController {

    static async upload(req, res) {
        try {
            upload(req, res, async function (err) {
                if(!err){
                    if((req.file.mimetype || "").startsWith("image"))
                    {
                        if(req.file.size > 3*1024*1024)
                        {
                            return Afterware.sendResponse(req,res,500, {
                                status:"error",
                                data: "upload a small image file",
                            })
                        }
                        else{
                            // image is okay from here
                            const user_id = req.params.user_id || "";
                            if (!user_id && user_id === "") {
                                return Afterware.sendResponse(req, res, 400, {
                                    status: "Validation Error",
                                    message: "Enter Proper user_id",
                                });
                            }
                            else{
                                let user = await User.find({ _id: user_id })
                                if(user.length !== 1){
                                    return Afterware.sendResponse(req, res, 400, {
                                        status: "Validation Error",
                                        message: "No User Exists",
                                    });
                                }
                                else{
                                    user = user[0]

                                    let path = "Profile_Pic_" + new Date().getTime().toString()
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