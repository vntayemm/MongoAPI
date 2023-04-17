const express = require('express');
const router = express.Router();
const fileUploadController = require('../../../controller/client/v1/fileUpload');
const responseHandler = require('../../../utils/response/responseHandler');
const { auth } = require('../../../middleware');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.route('/client/api/v1/upload').post(auth(PLATFORM.CLIENT),fileUploadController.upload);

module.exports = router;
