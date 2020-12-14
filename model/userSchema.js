const { strikethrough } = require('chalk');
const mongoose=require('mongoose');
var schema =mongoose.Schema;
var UserSchema=new schema({
    name: {type: String, default: ""},
    phone: {type: String, default: ""},
    email: {type: String, default: ""},
    password: {type: String, default:"1234"},
    gender: {type: String, default: ""},
    DOB: {type: String, default: ""},
    date:{type:String,default:Date()}
})

module.exports=mongoose.model('User',UserSchema)