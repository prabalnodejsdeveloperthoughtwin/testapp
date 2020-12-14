require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const sendSms = (phone, message) => {
    console.log("hello"+phone,message+accountSid+authToken)
  const client = require('twilio')(accountSid, authToken);
  client.messages
    .create({
       body: message,
       from: process.env.TWILIO_PHONE_NUMBER,
       to: phone
     })
    .then(message => console.log(message.sid),(err,data)=>{
        if(err){
            console.log("errtwilloi"+err)
        }
    });
}

module.exports = sendSms;