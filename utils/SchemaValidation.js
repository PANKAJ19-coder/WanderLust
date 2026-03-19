const Joi = require('joi');

const ListingSchema= Joi.object({
    Listing:Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().allow("",null),
    price: Joi.number().required().min(0),
    location: Joi.string().required(),
    country: Joi.string().required(),
    category:Joi.string().valid('Summer Destination', 'Iconic City', 'Beach', 'Mountains', 'Nature', 'Resort', 'Downtown', 'Farmhouse').required(),
    }).required(),
});

const ReviewSchema= Joi.object({
    Review:Joi.object({
        rating:Joi.number().required().min(0).max(5),
        comment:Joi.string().required(),
    }).required()
});
module.exports= {ListingSchema, ReviewSchema};
