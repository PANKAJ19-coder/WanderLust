const Listing= require("../Models/Listing.js");
const Review= require("../Models/review.js");

addReview= async(req, res)=>{
    let {id}= req.params;
    let review=  new Review(req.body.Review);
    let listing= await Listing.findById(id);
    review.author= req.user._id;
    listing.reviews.push(review);
    await review.save();
    await listing.save();
    req.flash("success", "New Review added")
    res.redirect(`/listing/${listing.id}`);
}

deleteReview= async(req, res)=>{
    let {id, reviewId}= req.params;
    await Listing.findByIdAndUpdate(id, {$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', "Review Deleted")
    res.redirect(`/listing/${id}`);
}

module.exports= {addReview, deleteReview}