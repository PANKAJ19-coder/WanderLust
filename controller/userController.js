let User= require("../Models/user.js");

renderSignupForm= (req, res)=>{
    res.render("user/signUp.ejs");
}

signUp= async (req, res, next)=>{
    try{
    let {username, email, password}= req.body;
    let newUser= new User({username, email});
    await User.register(newUser, password);
    req.login(newUser, (err)=>{
        if(err){
            next(err);
        }else{
            req.flash("success", "Welcome to WanderLust");
            res.redirect("/listing");
        }
    })
    
}catch(e){
    req.flash("error", e.message);
    res.redirect("/listing");
}
}

renderLoginForm= (req, res)=>{
    res.render("user/login.ejs");
}

afterLogin= (req, res)=>{
    req.flash("success", "Welcome Back!");
    let redirectUrl= res.locals.redirect || '/listing';
    res.redirect(redirectUrl);
    }

logOut= (req, res)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }else{
        req.flash("success", "You Logged out");
        res.redirect("/listing");
        }
    });
}

module.exports={logOut, afterLogin, renderLoginForm, signUp, renderSignupForm};