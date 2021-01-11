const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Createe Schema
const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avater:{//头像字段
        type:String
    },
    identity:{//身份字段
        type:String,
        required:true
    },
    status:{//状态是否启用  1 启用   2 禁用
        type:Number,
        default: 1
    },
    date:{
        type:Date,
        // default:Date.now
        default:new Date(new Date().getTime() + 28800000)
    }
})

module.exports = User = mongoose.model("users",UserSchema);