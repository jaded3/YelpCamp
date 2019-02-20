var mongoose=require("mongoose");

var reviewSchema = new mongoose.Schema({
    title: String,
    author: String,
    cover: String,
    body: String,
    created: { type: Date, default: Date.now},
    comments:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ]
});

module.exports=mongoose.model("Review",reviewSchema);