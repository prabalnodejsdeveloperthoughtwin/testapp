
const { NotImplemented } = require('http-errors');
const mongoose=require('mongoose');
var schema =mongoose.Schema;
var moment=require('moment');
var starttimestamp=0;
var expiretimestamp=0;
starttimestamp=Math.floor(Date.now() / 1000);
expiretimestamp=starttimestamp+21000;
var OtpSchema=new schema({
    otp: {type: String, default: ""},
    userid:{type: schema.Types.ObjectId, ref: 'User', required: true},
    date:{type:String,default:Date()},
    starttime:{ type: Number, default:starttimestamp},
    Endtime:{ type: Number, default:expiretimestamp}
})

module.exports=mongoose.model('verifySchema',OtpSchema)