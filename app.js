if (process.env.NODE_ENV != 'production'){
    require('dotenv').config()
};
const express= require("express");
const app= express();
const mongoose = require('mongoose');
const path= require("path");
const methodOverride= require("method-override");
app.use(methodOverride('_method'));
let ejsMate= require('ejs-mate');
const ExpressError = require("./utils/ExpressError.js");
const listingRouter=require("./routes/Listing.js");
const reviewRouter= require("./routes/reviews.js");
const userRouter= require("./routes/user.js");
const session= require('express-session');
const MongoStore = require('connect-mongo').default;
const flash= require("connect-flash");
const passport= require('passport');
const localStrategy= require('passport-local');
const User= require("./Models/user.js");
const dburl= process.env.DB_link ;

async function main() {
  await mongoose.connect(dburl);
}
main().then(()=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log(err);
});

const store = MongoStore.create({
    mongoUrl:dburl,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter:24 * 3600,
    });

let sessionOptions={
    store:store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    },
};

app.set("View engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let port= 3000;
app.listen(port, (req, res)=>{
    console.log("Port is listening");
});

app.use((req, res, next)=>{
    res.locals.success= req.flash("success");
    res.locals.error= req.flash("error");
    res.locals.currUser= req.user;
    next();
})


app.get("/",(req, res)=>{
    res.redirect("/listings");
});
app.use("/listing", listingRouter)
app.use("/listing/:id/review", reviewRouter);
app.use("/", userRouter);



app.use((req, res)=>{
    throw new ExpressError(404, "Page not Found!");
});
app.use((err, req, res, next)=>{
    let { status= 500, message= "Some Error Occured!"}= err;
    res.status(status).render("error.ejs", {message});
});
