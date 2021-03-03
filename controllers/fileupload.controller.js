const Afterware = require("../lib/afterware");
let multer = require('multer')
let upload = multer().single('file')
let fs = require("fs")

class FileUploadController {

    static async upload(req, res) {
        try {
            upload(req, res, function (err) {
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
                            let path = req.body.user_id || new Date().getTime().toString()
                            path = "uploads/" + path
                            fs.writeFileSync(path, req.file.buffer);
                            return Afterware.sendResponse(req,res,200, {
                                status:"success",
                                data: "/static/" + path,
                            })
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