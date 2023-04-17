const express = require('express');
const router = express.Router();
const fileUploadController = require('../../controller/admin/fileUpload');
const responseHandler = require('../../utils/response/responseHandler');
const { auth } = require('../../middleware');
const { PLATFORM } =  require('../../constants/authConstant'); 

router.route('/admin/upload').post(auth(PLATFORM.ADMIN),fileUploadController.upload);

module.exports = router;
