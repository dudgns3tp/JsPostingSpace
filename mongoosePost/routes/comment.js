const express = require('express');
const router = express.Router();
const commentController = require('../controller/comment');

router.post('/', commentController.createComment);
module.exports =router;