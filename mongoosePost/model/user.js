const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    userName:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    salt:String,
    phone:{type:String, required:true, unique:true},
    ranking:Number,
    profileImage:String,
    group:[{
        groupCode:{type:String, default:null},
        info:String
    }]
})
module.exports = mongoose.model('post',postSchema)