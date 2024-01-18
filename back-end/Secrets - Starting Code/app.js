//jshint esversion:6
require('dotenv').config();
const bodyParser=require("body-parser");
const express =require("express");
const ejs =require("ejs");
const mongoose =require("mongoose");
const session=require("express-session");
const passport=require("passport");
const passportLoginMongoose=require("passport-local-mongoose")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate=require("mongoose-findorcreate")

//const bcrypt =require("bcrypt");
//const md5 = require("md5");
//const encrypt=require("mongoose-encryption");
//const { setUncaughtExceptionCaptureCallback } = require("process");

const app=express();
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(session({
    secret:"potato",
    resave:false,
    saveUninitialized:false
})); 
app.use(passport.initialize());
app.use(passport.session())
mongoose.connect("mongodb://127.0.0.1:27017/userDB",{useNewUrlParser:true})
const userSchema=new mongoose.Schema({
    email:String,
    password:String
}
);
userSchema.plugin(passportLoginMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User",userSchema);



passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
//const secret="potato";
// userSchema.plugin(encrypt,{secret: process.env.SECRET ,encryptedFields:["password"]});//process.env.SECRET acceses the .env file







app.listen(3000,()=>{
    console.log('app started on port 3000');

});


app.get("/",(req,res)=>{
    res.render("home.ejs")
});

app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] })
);
app.get("/login",(req,res)=>{
    res.render("login.ejs")
});

app.get("/register",(req,res)=>{
    res.render("register.ejs")
});
app.get("/secrets",(req,res)=>{
    if (req.isAuthenticated()){
        res.render("secrets.ejs")
    }
    else{
        res.redirect("/login");
    }
})
app.get("/logout",(req,res)=>{
    req.logout(
        (err)=>{
            if (err){
                console.log(err)
            }
            else{
                res.redirect("/");
            }
        }
    );
    
})

app.post("/register",(req,res)=>{
    // const newUser =new User({
    //     email:req.body.username,
    //     password:md5(req.body.password)
    // });
    // newUser.save().then(()=>{
    //     console.log("new user saved")
    // });
    // res.render("secrets")

    User.register({username:req.body.username},req.body.password,(err,user)=>{
        if (err){
            console.log(err)
            res.redirect("/register")
        }
        else{
            passport.authenticate("local")(req,res,()=>{
                res.redirect("/secrets")
            })
        }
    })

    
});
app.post("/login",(req,res)=>{
    // const username=req.body.username;
    // const password=req.body.password;
    // User.findOne({
    //     email:username
    // }).then((foundUser)=>{
    //     console.log(foundUser);
    //     if (foundUser){
    //         if(foundUser.password===md5(password)){
    //             res.render("secrets")
    //         } 
    //     }
        
    // }).catch((err)=>{
    //     console.log(err)
    // });
    const user =new User({
        username:req.body.username,
        password:req.body.password
    });

    req.login(user,(err)=>{
        if (err){
            console.log(err);
        }
        else{
            passport.authenticate("local")(req,res,()=>{
                res.redirect("/secrets")
            })
        }
    })
});

