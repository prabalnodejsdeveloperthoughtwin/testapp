const { startSession } = require('mongoose');
const passport = require('passport');
// const strategy = require('passport-facebook')
const userModel=require('./model/userSchema')
// const FacebookStrategy = strategy.Strategy;

// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const LocalStrategy=require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  console.log("I AM SERIALIZE"+JSON.stringify(user));
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log("I AM DESERIALIZE");
  done(null, obj);
});

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//       callbackURL: process.env.FACEBOOK_CALLBACK_URL,
//       profileFields: ["email", "name"]
//     },
//     function(accessToken, refreshToken, profile, done) {
//       const { email, first_name, last_name } = profile._json;
//       console.log("profile"+JSON.stringify(profile))
//       const userData = {
//         email:email,
//         name:first_name+last_name
//         };
//       new userModel(userData).save();
//       done(null, profile);
//     }
//   )
// );

// passport.use(new GoogleStrategy({
  //   clientID: GOOGLE_CLIENT_ID,
  //   clientSecret: GOOGLE_CLIENT_SECRET,
  //   callbackURL: "http://localhost:3000/auth/google/callback",
  //   profileFields: ["email", "name"]
  // },
//   function(accessToken, refreshToken, profile, done) {
//       userProfile=profile;
//       const { email, first_name, last_name } = profile._json;
//       console.log("profile"+JSON.stringify(profile))
//       const userData = {
//         email:email,
//         name:first_name+last_name
//         };
//       new userModel(userData).save();
//       return done(null, userProfile);
//   }
// ));

// ));
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: true
},
  function(email, password, done) {
    console.log("hello")
    userModel.findOne({$and:[{email: email},{password:password}]}, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user);
    });
  }
));