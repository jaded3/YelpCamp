var express = require("express");
var app= express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var Campground= require("./models/campground");
var seedDB = require("./seeds");
var Comment=require("./models/comment");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var User=require("./models/user");
var methodOverride=require("method-override");
var flash=require("connect-flash");



//routes
var commentRoutes=require("./routes/comments");
var campgroundRoutes=require("./routes/campgrounds");
var indexRoutes=require("./routes/index");
    
//seed database:    
// seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


//passport config
app.use(require("express-session")({
    secret: "whatever",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//own middleware for login
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.nope=req.flash("nope");
   res.locals.success=req.flash("success");
   next();
});

//for routes
app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);




app.listen(process.env.PORT,process.env.IP,function(){
    console.log("The YelpCamp server has started");
});