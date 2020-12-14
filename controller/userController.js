const User = require('../model/userSchema')
const stripe = require('stripe')('sk_test_51HtSIGAojdNqrjDEufwnbzzywMbjC531Ncpl3f0rlurRN2VhfKCeV3SPWeqUELkzdBanVIvalQ7vNrsUFoGa5QeG00Riz7rkPB');
const key="pk_test_51HtSIGAojdNqrjDE3XXOGErtaymb12zFODEhYqlQ35PLYreiMIoXimoJRHZsCp7XhBk0975ufemK4sqymLSYbgrE00Dw6HhwmI"
exports.getUser = (req, res,next) => {
    res.render('adduser')
  }
  
  exports.getEdituser = (req, res,next) => {
    User.find({_id:require.params.id},(err,docu)=>{
        res.render('updateuser',{
            user:user
        })
    })
   
  }
exports.addUser = (req, res, next) => {

 // console.log("hello from me"+JSON.stringify(data))

 const user = new User();

 user.name = req.body.name;
 user.email = req.body.email;
 user.gender = req.body.gender;
 user.DOB = req.body.DOB
 user.phone = req.body.phone;
 User.findOne({ email: req.body.email }, (err, existingUser) => {
   if(!existingUser){
    user.save((err) => {
        if (err) {
          return next(err);
        } else {
         res.redirect('/');
        }
     });
}else{
       response.send({
           status:200,
           success:true,
           message:"user already exists"
       })
      }
  })
}
exports.postDeleteuser=(req,resp,next)=>{
  var userid=req.params.id;
  User.findByIdAndDelete({_id:userid},(err,deletedata)=>{
       if(!err){
        resp.send({
          code:200,
          success:true,
          message:"user deleted successfully"
        })
      
       }else{
        resp.send({
          code:400,
          success:false,
          message:"user deleted unsuccessfull"
        })
       }
  })
}
exports.getEdituser=(req,res,next)=>{
  var id=req.params.id;
  console.log("id"+id)
  User.find({_id:id},(err,docu)=>{
    console.log("docu"+docu)
    res.render('updateuser',{
      user:docu
    })
  })

}
exports.postUpdatuser=(req,res,next)=>{
  var id=req.params.id;
  console.log("req"+JSON.stringify(req.body))
  var query=req.body
  console.log("GGGGGGG"+id)
  User.findByIdAndUpdate({_id:id},query,(err,docu)=>{
    
    if(!err){
      res.send({
        status:200,
        success:true,
        msg:"update unsuccessfull"
      })
    }else{
      res.send({
        code:400,
        success:false,
        msg:"update unsuccessfull"
      })
    }
  })
}
exports.checkRouting=(req,resp,next)=>{
  resp.send({
    code :200,
    data:"hello from server"
    
  })
}
exports.getStripe=(req,res,next)=>{
  res.render('stripe', { 
         key:key,
         amount:req.params.amount,
         currency:req.params.currency,
         user_id:req.params.UserID
 
      }) 
   
 }
 //post stripe  
 exports.postStripe=(req,res,next)=>{
            stripe.customers.create({ 
                 email: req.body.stripeEmail, 
                 source: req.body.stripeToken, 
                 name: "prabal", 
                 address: { 
                     line1: 'prabal ', 
                     postal_code: '452210', 
                     city: 'Indore', 
                     state: 'Madhya Pradesh', 
                     country: 'India', 
                 } 
             }) 
             .then((customer) => { 
                 console.log("customerid"+customer.id)
                 return stripe.charges.create({ 
                     amount: req.params.amount,     // Charing Rs 25 
                     description: "for buy demo", 
                     currency: req.params.currency, 
                     customer:customer.id,
                 }); 
             }) 
             .then((charge) => { 
                 
                 res.send({code:200,succuss:true,message:"payment successfully"})
                
             }) 
             .catch((err) => {
                 console.log(err+err);
                 res.send(err)       // If some error occurs 
             }); 
        
       
    
   
 }
 exports.getStripeview=(req,res,next)=>{
   User.find({email:req.session.email},(err,docu)=>{
   
   res.render('stripeview',{
     user:docu
     
  }) 
   }) 
   
 }