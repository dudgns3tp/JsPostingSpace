const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment')
 
const commentSchema = new Schema({
    content: String,
    writer: String,
    comment_date: {type: Date, default:moment().format('YYYY/MM/DD HH:mm:ss')}
})
 
module.exports = mongoose.model('comment', commentSchema);