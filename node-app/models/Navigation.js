const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NavigationSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    desc:{
        type:String
    },
    date:{
        type:Date,
        default:new Date(new Date().getTime() + 28800000)
    }
})

module.exports = Navigation = mongoose.model("navigation",NavigationSchema);