//for express
var express = require("express");
var app=express();
//for mongoose
var mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/book');
var Review=require("./models/review");
var Comment=require("./models/comment");
//for body-parser
var bodyParser=require("body-parser");
app.use(bodyParser({urlencoded: true}));
//for method-override
var methodOverride=require("method-override");
app.use(methodOverride("_method"));







app.set("view engine","ejs");
app.use(express.static("public"));




// Review.create({
//     title: "A Court of Mist and Fury",
//     author: "Sarah J. Maas",
//     cover: "https://78.media.tumblr.com/214bbb716b29d92767b3d2542855ffad/tumblr_o3jbukOEdQ1u0il5ao1_1280.jpg",
//     body: "Great book.",
// });


//default
app.get("/",function(req,res){
    res.render("welcome");
});

//home page
app.get("/home",function(req,res){
    Review.find({},function(err,reviews){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("review/home", {reviews: reviews});
        }
    });
});

//new
app.get("/home/new",function(req,res){
    res.render("review/new");
});

//create
app.post("/home",function(req,res){
    Review.create(req.body.review, function(err,newRev){
        if(err){
            console.log(err);   
        }
        else{
            res.redirect("review/home");
        }
    });
});

//show
app.get("/home/:id",function(req,res){
    Review.findById(req.params.id,function(err,foundRev){
        if(err){
            console.log(err);
        }
        else{
            res.render("review/show", {review: foundRev});     
        }
    });
});

//edit
app.get("/home/:id/edit",function(req,res){
    Review.findById(req.params.id,function(err, foundRev){
        if(err){
            console.log(err);
        }
        else{
            res.render("review/edit", {review: foundRev});
        }
    });
});

//update
app.put("/home/:id",function(req,res){
   Review.findByIdAndUpdate(req.params.id,req.body.review,function(err, updateRev){
        if(err){
            console.log(err);
        }        
        else{
            var showUrl = "review/home/" + req.params.id;
         res.redirect(showUrl);
        }
    });
});

//delete
app.delete("/home/:id",function(req,res){
   Review.findByIdAndRemove(req.params.id,function(err){
       if(err){
           console.log(err);
       }
       else{
           res.redirect("review/home");
       }
   }); 
});

//comment routes

//comments new form
app.get("/home/:id/comments/new",function(req, res) {
    Review.findById(req.params.id,function(err, foundRev) {
        if(err){
            console.log(err);
        }
        else
        {
            res.render("comments/new", {review: foundRev});      
        }
    });
});

//post comment
app.post("/home/:id/comments",function(req,res){
    Review.findById(req.params.id,function(err, foundRev){
        if(err){
            console.log(err);
        }
        else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }
                else{
                    foundRev.comments.push(comment);
                    foundRev.save();
                    res.redirect('/home/'+foundRev._id);
                }
            });
        }
    });
});

app.listen(process.env.PORT, process.env.IP,function(){
    console.log("The Server Has Started.");
});