const router = require("express").Router();
const Controller = require("../../controllers/fileupload.controller");
   
router.post("/upload/:user_id", Controller.upload);

module.exports = router;