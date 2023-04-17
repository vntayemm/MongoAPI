const express = require('express');
const router =  express.Router();
const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs:3600 * 60 * 1000,
  max:1000,
  message: 'Rate limit exceeded, please try again after 3600 minutes',
  skip: (req) => {
    if (req.url.includes('/swagger') || req.url.includes('/favicon')) {
      return true;
    } else {
      return false;
    }
  }
});

router.use(rateLimiter,require('./admin/index'));  
router.use(rateLimiter,require('./device/v1/index'));  
router.use(rateLimiter,require('./client/v1/index'));  

module.exports = router;
