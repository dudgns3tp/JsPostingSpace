const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
    placeName:{type:String, required:true},
    category:[String],
    imageUrl:[String],
    location:[{
        latitude:{type:String, required:true},
        longitude:{type:String, required:true}
    }],
    createdDateTime:{type: Date, default:Date.now()},
    stations:[String],
    tagList:[String],
    description:String,
    upLoader:{type:String, required:true},
    see:{type:Number, default:0},
    likePlace:{type:Number, default:0},
    commentsCount:{type:Number,default:0},
    groupCode:String,
    comments :[{type:mongoose.Schema.Types.ObjectId, ref: 'comment'}]
},{versionKey:'_somethingElse'})

module.exports = mongoose.model('place',placeSchema)
