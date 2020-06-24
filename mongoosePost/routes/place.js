const express = require('express');
const router = express.Router();
const upload = require('../module/multer')
const placeController = require('../controller/place');

router.post('/post',upload.array('image'), placeController.uploadPlace);
router.get('/',placeController.readPlace);
module.exports =router;