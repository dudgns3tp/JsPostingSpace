const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    groupName:{type: String, required : true}, //
    groupInfo:String,
    groupImage:String,
    groupIcon:String,
    groupCode:{type:String, unique:true},
    groupAdmin:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}],
},{versionKey:'_somethingElse'})
module.exports = mongoose.model('group',groupSchema)
