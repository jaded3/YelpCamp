var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var middleware=require("../middleware");

//index page
router.get("/",function(req,res){
    Campground.find({}, function(err,allcampgrounds){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("campgrounds/index", {campgrounds: allcampgrounds, currentUser: req.user});
        }
    });
});

//to add 
router.post("/",middleware.isLoggedIn,function(req,res){
   var name= req.body.name;
   var price=req.body.price;
   var image= req.body.image;
   var desc= req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   }
   var newCampgrounds= {name: name,price: price, image: image, description: desc, author: author};
   Campground.create(newCampgrounds, function(err, newlyCreated){
       if(err)
       {
           console.log(err);
       }
       else
       {
            res.redirect("/campgrounds");
       }
   });
});


//add form
router.get("/new", middleware.isLoggedIn,function(req,res){
   res.render("campgrounds/new"); 
});

//show
router.get("/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err)
       {
           console.log(err);
       }
       else
       {
           console.log(foundCampground);
           res.render("campgrounds/show", {campground: foundCampground, currentUser: req.user});
       }
    });
});

//edit
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req, res) {
            Campground.findById(req.params.id,function(err,foundCampground){
            if(err){
                res.redirect("/campgrounds");
                }
            else{
                    res.render("campgrounds/edit", {campground: foundCampground});
            }
        });
});

//update
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

//destroy
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
        }
    });
});


//middleware


//middleware auth


module.exports=router;
