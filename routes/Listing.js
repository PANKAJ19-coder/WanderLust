const express= require('express');
const router= express.Router();
const multer  = require('multer');
const {storage}= require("../cloudConfig.js");
const upload = multer({ storage});

const {ListingValidation, loggedIn, isOwner,}= require("../middleware.js");


const {AllListingRoute, searchListing, renderNewForm, addNewListing, renderEditForm, updateListing, deleteListing, showListing, findSummer, findCity, findBeach, findMountain, findFarm, findDowntown, findResort, findNature}= require("../controller/listingController.js")


router.route("/")
.get( AllListingRoute )
.post( loggedIn,  upload.single('Listing[image]'), ListingValidation, addNewListing);

//category
router.get('/Summer_Trips', findSummer);
router.get('/Iconic_Cities', findCity);
router.get('/Beach', findBeach);
router.get('/Mountains', findMountain);
router.get('/Nature', findNature);
router.get('/Resort', findResort);
router.get('/downtown', findDowntown);
router.get('/Farmhouse', findFarm);

//new route
router.get("/new", loggedIn, renderNewForm);

router.route("/:id")
.get(showListing)
.delete(loggedIn, isOwner, deleteListing)
.put(upload.single('Listing[image]'),ListingValidation, updateListing);
 
//edit form route
router.get("/:id/edit", loggedIn, isOwner, renderEditForm);
//search
router.post('/search', searchListing);

module.exports= router;