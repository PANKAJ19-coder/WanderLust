const Listing= require("../Models/Listing.js");
const maptilerClient= require('@maptiler/client');

AllListingRoute=async (req, res)=>{
    let allListing= await Listing.find();
    res.render("Listing/List.ejs", {allListing});
}

findSummer= async( req, res)=>{
    let allrequired= await Listing.find({category: "Summer Destination"});
    res.render('Listing/category.ejs', {allrequired});
}
findCity= async( req, res)=>{
    let allrequired= await Listing.find({category: "Iconic City"});
    res.render('Listing/category.ejs', {allrequired});
}
findBeach= async( req, res)=>{
    let allrequired= await Listing.find({category: "Beach"});
    res.render('Listing/category.ejs', {allrequired});
}
findMountain= async( req, res)=>{
    let allrequired= await Listing.find({category: "Mountains"});
    res.render('Listing/category.ejs', {allrequired});
}
findNature= async( req, res)=>{
    let allrequired= await Listing.find({category: "Nature"});
    res.render('Listing/category.ejs', {allrequired});
}
findResort= async( req, res)=>{
    let allrequired= await Listing.find({category: "Resort"});
    res.render('Listing/category.ejs', {allrequired});
}
findDowntown= async( req, res)=>{
    let allrequired= await Listing.find({category: "Downtown"});
    res.render('Listing/category.ejs', {allrequired});
}
findFarm= async( req, res)=>{
    let allrequired= await Listing.find({category: "Farmhouse"});
    res.render('Listing/category.ejs', {allrequired});
}

renderNewForm= (req, res)=>{
    res.render("Listing/new.ejs");
}

showListing= async(req, res)=>{
        let map_key=process.env.maptiler_key;
        let {id}= req.params;
        let listingData= await Listing.findById(id).populate({path:'reviews', populate:{path:'author'}}).populate('owner');
        if(!listingData){
            req.flash("error", "Listing you want to access does not Exist");
            res.redirect("/listing");
        }else{
        res.render("Listing/show.ejs", {listingData, map_key});
        }
    
}

addNewListing= async (req, res) => {
    maptilerClient.config.apiKey= process.env.maptiler_key;
    const coordinate = await maptilerClient.geocoding.forward(req.body.Listing.location, {
        limit:1
    });
    let category= req.body.Listing.category;
    console.log(`category is:${category}`);
    const url= req.file.path;
    const filename= req.file.filename;
    const newListing =new Listing(req.body.Listing);
    newListing.image= {url:url, fileName:filename};
    newListing.owner= req.user._id;
    newListing.geometry= coordinate.features[0].geometry;
    newListing.category=category;
    let result= await newListing.save();
    console.log(result);
    req.flash("success", "New Listing created");
    res.redirect("/listing");
}

renderEditForm= async (req, res)=>{
    let {id}= req.params;
    let listingData= await Listing.findById(id);
    if(!listingData){
            req.flash("error", "Listing you want to edit does not Exist");
            res.redirect("/listing");
        }else{
            let currentimage= listingData.image.url;
            let currentImage= currentimage.replace("upload/", "upload/e_blur:300/" );
    res.render("Listing/edit.ejs", {listingData, currentImage});
        }
}

updateListing= async (req, res)=>{
    maptilerClient.config.apiKey= process.env.maptiler_key;
    const coordinate = await maptilerClient.geocoding.forward(req.body.Listing.location, {
        limit:1
    });
    let {id}= req.params;
    let editedListing= req.body.Listing;
    let listing= await Listing.findByIdAndUpdate(id, editedListing);
    if(req.file){
    let url= req.file.path;
    let fileName= req.file.filename;
    listing.image= {url, fileName};
    }
    listing.geometry= coordinate.features[0].geometry;
    await listing.save();
    req.flash("success", "Listing Updated");
    res.redirect(`/listing/${id}`);
}

deleteListing= async(req, res)=>{
        let {id}=req.params;
        await Listing.findByIdAndDelete(id);
        req.flash("success", "Listing Deleted");
        res.redirect("/listing");
}
searchListing= async (req, res)=>{
    let {region}= req.body;
    let result1= await Listing.find({location : {$regex:region, $options: "i"}});
    let result2= await Listing.find({country: {$regex:region, $options: "i"}});
    if(result1.length==0 && result2.length==0){
        res.render('includes/noresult.ejs');
    }else{
    res.render('Listing/search.ejs', {result1, result2, region});
    }
}
module.exports= {AllListingRoute, renderNewForm, showListing, addNewListing, renderEditForm, updateListing, deleteListing, findSummer, findCity, findBeach, findMountain, findFarm, findDowntown, findResort, findNature, searchListing}