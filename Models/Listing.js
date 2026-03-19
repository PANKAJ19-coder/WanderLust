const mongoose= require('mongoose');
const Review = require('./review.js');

const ListingSchema= new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String
    },
    image:{
        url: String,
        fileName: String
    },
    price:{
        type:Number
    },
    location:{
        type:String
    },
    country:{
        type:String
    },
    reviews:[
        {
            type:mongoose.Types.ObjectId,
            ref:'Review'
        }
    ],
    owner:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    geometry:{
        type:{
            type:String,
            enum:['Point'],
            required:true
        },
        coordinates:{
            type:[Number],
            required:true
        }
    },
    category:{
        type:String,
        enum:['Summer Destination', 'Iconic City', 'Beach', 'Mountains', 'Nature', 'Resort', 'Downtown', 'Farmhouse'],
        required:true
    }
});

ListingSchema.post("findOneAndDelete", async(Listing)=>{
    if(Listing){
    await Review.deleteMany({_id:{$in:Listing.reviews}});
    }
});

const Listing= mongoose.model("Listing", ListingSchema);
module.exports= Listing;