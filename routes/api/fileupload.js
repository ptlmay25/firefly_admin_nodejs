const router = require("express").Router();
const Controller = require("../../controllers/fileupload.controller");
   
router.post("/upload", Controller.upload);

module.exports = router;