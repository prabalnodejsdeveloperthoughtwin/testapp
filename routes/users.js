var express = require('express');
var router = express.Router();
const passport = require('passport');
const userController=require('../controller/userController')
/* GET users listing. */
router.get('/getuser',userController.getUser);
router.post('/adduser',userController.addUser);
router.get('/edituser/:id',userController.getEdituser);
router.post('/deleteuser/:id',userController.postDeleteuser);
router.post('/updatuser/:id',userController.postUpdatuser);
router.get('/hello+who',userController.checkRouting);
router.get('/pr*xy',userController.checkRouting);
router.get('/us(ad)?fe',userController.checkRouting);
router.get('/hello?cd',userController.checkRouting);
router.get('/hello?cd',userController.checkRouting);
router.get('/hello?cd',userController.checkRouting);
router.get('/hello?cd',userController.checkRouting);
router.get('/hello?cd',userController.checkRouting);
router.get('/hello?cd',userController.checkRouting);
router.get('/stripview',userController.getStripeview)
router.get('/stripe/:amount/:currency/:UserID', (userController.getStripe));
router.post('/stripe/:amount/:currency/payment', (userController.postStripe));
// router.get('/deleteuser/:id',userController.DeleteUser);
module.exports = router;
