var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "I love you, buddy! Isn't it true that you have been paid for your testimony? Bender, being God isn't easy. If you do too much, people get dependent on you, and if you do nothing, they lose hope. You have to use a light touch. Like a safecracker, or a pickpocket. Okay, I like a challenge. We're rescuing ya. I'll tell them you went down prying the wedding ring off his cold, dead finger. I videotape every customer that comes in here, so that I may blackmail them later."
    },
    {
        name: "A Whole New View", 
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d9df10d159cc11074d9a7996e8aca442&auto=format&fit=crop&w=1050&q=80",
        description: "I love you, buddy! Isn't it true that you have been paid for your testimony? Bender, being God isn't easy. If you do too much, people get dependent on you, and if you do nothing, they lose hope. You have to use a light touch. Like a safecracker, or a pickpocket. Okay, I like a challenge. We're rescuing ya. I'll tell them you went down prying the wedding ring off his cold, dead finger. I videotape every customer that comes in here, so that I may blackmail them later."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "I love you, buddy! Isn't it true that you have been paid for your testimony? Bender, being God isn't easy. If you do too much, people get dependent on you, and if you do nothing, they lose hope. You have to use a light touch. Like a safecracker, or a pickpocket. Okay, I like a challenge. We're rescuing ya. I'll tell them you went down prying the wedding ring off his cold, dead finger. I videotape every customer that comes in here, so that I may blackmail them later."
    }
]

function seedDB()
{
   //Remove all campgrounds
   Campground.remove({}, function(err)
  {
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("removed campgrounds!");
            data.forEach(function(seed)
            {
                Campground.create(seed, function(err, campground)
                {
                    if(err)
                    {
                        console.log(err)
                    } 
                    else 
                    {
                        console.log("added a campground");
                        //create a comment
                         Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment)
                            {
                              if(err)
                                {
                                    console.log(err);
                                } 
                                else 
                                {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                        });
                       
                    }
                });
            });
        }
    });
}

module.exports = seedDB;
