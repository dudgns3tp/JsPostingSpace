var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
const commentSchema = new Schema({
    content: String,
    writer: String,
    comment_date: {type: Date, default: Date.now()}
})
 
module.exports = mongoose.model('comment', commentSchema);