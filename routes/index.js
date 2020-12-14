const { json } = require('body-parser');
var express = require('express');
var router = express.Router();
const passport = require('passport');
const User = require('../model/userSchema')
const sendSms = require('../config/otpverification');
var otpGenerator = require('otp-generator')
const verifyotp=require('../model/otpSchema')
var moment=require('moment')
const timestamp=Math.floor(Date.now() / 1000);
/* GET home page. */
router.get('/index', function(req, res, next) {
User.find({},(err,user)=>{

  res.render('index',
   { title: 'curd operation',
   user:user}
   );
});
})
router.get('/chat', function(req, res, next) {
  
    res.render('socketio');

  })
  router.get('/veryfyotp', function(req, res, next) {
  
    res.render('verifyotp');

  })
router.get('/',function(req,res,next){
  res.render('login');
})
router.post("/login",passport.authenticate('local', { failureRedirect: '/' }),(req,res,next)=>{
  console.log(JSON.stringify(req.body))
       User.find({$and:[{email:req.body.email},{password:req.body.password}]},(erruser,docuuser)=>{
         if(docuuser.length>0){
          ssn = req.session;
          ssn.email=req.body.email;
          ssn.password=req.body.password;
          ssn.userid=docuuser[0]._id;
          console.log("indexsessin"+JSON.stringify(req.session))
          var otp_verification= otpGenerator.generate(6, { upperCase: false, specialChars: false });
          const welcomeMessage = 'Welcome to myapp Your verification code is'+otp_verification;
          sendSms("+919827538282", welcomeMessage);
          var votp= new verifyotp({
            otp:otp_verification,
            userid:docuuser[0]._id
          })
          let otppromise=new Promise((resolve,reject)=>{
            verifyotp.find({userid:docuuser[0]._id},(err,docu)=>{
              if(docu.length>0){
                verifyotp.findByIdAndDelete({_id:docu[0]._id},(deerr,docude)=>{
                  if(deerr){
                    console.log("deerr"+err)
                  }else{
                    votp.save((err,data)=>{ if(err){console.log("error in save otp"+err+docuuser[0]._id)}})
                    res.redirect('/veryfyotp')
                    resolve('success')
                  }
                })
              }else{
                votp.save((err,data)=>{ if(err){console.log("error in save otp"+err+docuuser[0]._id)}})
                res.redirect('/veryfyotp')
                resolve('success')
              }
            })
          })
         
            
         }else{
           res.send({
             code:400,
             success:false,
             message:"wrong cardinals"
           })
         }
       })
})
router.get("/auth/facebook", passport.authenticate("facebook"));
router.post('/otpverification',function(req,res){
  console.log("req.body.otp"+req.body.otp)
  verifyotp.find({$and:[{otp:req.body.otp},{userid:req.session.userid}]},(errdoc,doc)=>{
    if(doc==""||doc==null){
      res.send({
        code:400,
        data:"otp incorrect"
      })
    }else{
      console.log("ftttttttttt"+timestamp+doc[0].Endtime+doc[0].Endtime+(timestamp<=doc[0].Endtime &&timestamp>=doc[0].starttime)                          )
      if(timestamp<=doc[0].Endtime &&timestamp>=doc[0].starttime){
        res.redirect('/index');
      }else{
        res.send({
          code:400,
          data:"otp expire"
        })
      }
       
      
  }
  
  })
  
});  

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/index",
    failureRedirect: "/"
  })
);

router.get("/fail", (req, res) => {
  res.send("Failed attempt");
});
router.get('/logout',(req,res,next)=>{
  req.logout();
  console.log(req.session)
  req.session.destroy((err) => {
    
    if (err) console.log('Error : Failed to destroy the session during logout.', err);
   res.redirect('/');
  
})
})
router.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
router.get('/auth/google/callback', 
  passport.authenticate('google', { successRedirect: "/index",
  failureRedirect: "/" }),
  );
module.exports = router;
