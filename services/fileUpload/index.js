const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const makeDirectory = require('../../utils/makeDirectory');

let S3Config = {
  AWS_S3_ACCESS_KEY_ID: process.env.AWS_S3_ACCESS_KEY_ID,
  AWS_S3_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY,
  AWS_S3_REGION: process.env.AWS_S3_REGION,
  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
};
async function uploadFilesOnS3 (file, fields, fileCount, allowedFileTypes, maxFileSize) {
  let extension = path.extname(file.originalFilename);
  extension = extension.split('.').pop();

  fileType = file.mimetype;

  if (allowedFileTypes.length == 0 || !allowedFileTypes.includes(extension)) {
    return {
      status: false,
      message: 'Filetype not allowed.'
    };
  }

  // Check File Size
  const fileSize = ((file.size / 1024) / 1024);
  if (maxFileSize < fileSize) {
    return {
      status: false,
      message: `Allow file size upto ${maxFileSize} MB.`
    };
  }

  let fileName = file.originalFilename;
  //Create Requested Directory,if given in request parameter.
  if (fields && fields.folderName) {
    fileName = fields.folderName + '/' + fileName;
  }
  else if (fields && fields.fileName) {
    fileName = fields.fileName + '-' + fileCount + path.extname(file.originalFilename);
  }

  const s3 = new AWS.S3({
    region: S3Config.AWS_S3_REGION,
    accessKeyId: S3Config.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: S3Config.AWS_S3_SECRET_ACCESS_KEY
  });

  let params = {
    Bucket: S3Config.AWS_S3_BUCKET_NAME,
    Body: fs.createReadStream(file.filepath),
    Key: fileName,
  };

  const response = await new Promise(async (resolve, reject) => {
    s3.putObject(params, function (error, data) {
      if (error) {
        resolve({
          status: false,
          message: error.message
        });
      } else {
        resolve({
          status: true,
          data: 'https://' + process.env.AWS_S3_BUCKET_NAME + '.s3.' + S3Config.AWS_S3_REGION + '.amazonaws.com/' + fileName
        });
      }
    });
  });

  return response;
}

module.exports = { uploadFilesOnS3, };