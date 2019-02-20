var middlewareObj={};
var Campground=require("../models/campground");
var Comment=require("../models/comment");

middlewareObj.checkCampgroundOwnership=function(req,res,next)
{
    if(req.isAuthenticated()){
            Campground.findById(req.params.id,function(err,foundCampground){
            if(err){
                req.flash("nope","Campground not found.");
                res.redirect("back");
                }
            else{
                if(foundCampground.author.id.equals(req.user._id)){
                    var currentUser=req.user;
                    next();
                }
                else{
                    req.flash("nope","You don't have permission to that");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("nope","You need to be logged in to do that.");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership=function(req,res,next){
    if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                req.flash("nope","Comment not found.");
                res.redirect("back");
                }
            else{
                if(foundComment.author.id.equals(req.user._id)){
                    var currentUser=req.user;
                    next();
                }
                else{
                    req.flash("nope","You don't have permission to that");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("nope","You need to be logged in to do that.");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
       req.flash("nope", "You need to be logged in to do that.");
        res.redirect("/login");
    }
}




module.exports=middlewareObj;