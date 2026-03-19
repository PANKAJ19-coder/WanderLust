const express= require("express");
const router= express.Router({mergeParams:true});
const {ReviewSchema}= require("../utils/SchemaValidation.js");
const {loggedIn, isReviewAuthor}= require("../middleware.js");
const{addReview, deleteReview}= require("../controller/reviewController.js")
const ExpressError = require("../utils/ExpressError.js");

const reviewValidation= (req, res, next)=>{
    let {error}= ReviewSchema.validate(req.body);
   
    if(error){
        let errMsg= error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400, errMsg);

    }else{
        next();
    }
}

//add review
router.post("/", loggedIn, reviewValidation, addReview);
//delete review
router.delete("/:reviewId", isReviewAuthor, deleteReview);

module.exports= router;
