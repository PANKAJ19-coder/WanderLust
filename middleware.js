const Listing= require('./Models/Listing.js');
const Review = require('./Models/review.js');
const {ListingSchema}= require("./utils/SchemaValidation.js");
const ExpressError = require("./utils/ExpressError.js");

loggedIn= (req, res, next)=>{
    if(!req.isAuthenticated()){
        req.session.originalreq= req.originalUrl;
        req.flash("error", "Please Login to move ahead!");
        res.redirect("/login");
    } else{
        next();
    }
}

redirectTo=(req, res, next)=>{
    if(req.session.originalreq){
    res.locals.redirect= req.session.originalreq;
    
    console.log(res.locals.redirect);
    }
    next();
}

isOwner= async(req, res, next)=>{
    let {id}= req. params;
    let listing= await Listing.findById(id);
    if(!(listing.owner.equals(res.locals.currUser._id))){
        req.flash("error", "Only owner can access this option");
        res.redirect(`/listing/${id}`);
    }else{
    next();
    }
}

ListingValidation= (req, res, next)=>{
    let {error}= ListingSchema.validate(req.body);
   
    if(error){
        let errMsg= error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

isReviewAuthor= async (req, res, next)=>{
    let {reviewId}= req.params;
    let{id}= req.params;
    let review= await Review.findById(reviewId);
    if(!(review.author.equals(res.locals.currUser._id))){
        req.flash("error", "Only author can delete review");
        res.redirect(`/listing/${id}`);
    }
    next();
}
module.exports= {loggedIn, redirectTo, isOwner, ListingValidation, isReviewAuthor};
