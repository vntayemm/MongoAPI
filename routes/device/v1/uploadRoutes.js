const express = require('express');
const router = express.Router();
const fileUploadController = require('../../../controller/device/v1/fileUpload');
const responseHandler = require('../../../utils/response/responseHandler');
const { auth } = require('../../../middleware');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.route('/device/api/v1/upload').post(auth(PLATFORM.DEVICE),fileUploadController.upload);

module.exports = router;
