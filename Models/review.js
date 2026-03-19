const mongoose= require('mongoose');

const reviewSchema= new mongoose.Schema({
    comment:String,
    rating:{
        type:Number,
        min:0,
        max:5
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    author:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
});


const Review=  mongoose.model("Review", reviewSchema);
module.exports= Review;