const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
    type:{
        type:String
    },
    describe:{
        type:String
    },
    income:{
        type:String,
        required:true
    },
    expend:{
        type:String,
        required:true
    },
    cash:{
        type:String,
        required:true
    },
    remark:{
        type:String
    },
    date:{
        type:Date,
        //  +28800000 原因：将获取到的服务器时间转化为北京时间
        default:new Date(new Date().getTime() + 28800000)
    }
})

module.exports = Profile = mongoose.model("profile",ProfileSchema);