const express= require("express");
const router= express.Router();
const passport= require("passport");
const {redirectTo}= require('../middleware.js');
const {logOut, afterLogin, renderLoginForm, signUp, renderSignupForm}= require("../controller/userController.js")

router.route("/signup")
.get( renderSignupForm)
.post( signUp);

router.route("/login")
.get(renderLoginForm)
.post(redirectTo, passport.authenticate('local', {
    failureRedirect:'/login',
    failureFlash:true,
}) , afterLogin);

router.get("/logout", logOut)

module.exports= router;