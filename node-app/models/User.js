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
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = User = mongoose.model("users",UserSchema);