const express = require("express");
const router = express.Router();
const jobRoutes = require("./job_routes");
const PagesController = require("./../controllers/pages_controller")
const AuthenticationController = require("./../controllers/authentication_controller");
const { celebrate, Joi, errors } = require("celebrate");
const { authRedirect } = require("./../middleware/authorisation_middleware");
const passport = require("passport");

router.get("/", authRedirect, PagesController.home);

router.get("/register", authRedirect, AuthenticationController.registerNew);

router.post("/register", celebrate({
  body: {
    email: Joi.string().required(),
    password: Joi.string().required()
  }
}), AuthenticationController.registerCreate);

router.get("/logout", AuthenticationController.logout);

router.get("/login", authRedirect, AuthenticationController.loginNew);

router.post("/login", celebrate({
  body: {
      email: Joi.string().required().error(new Error('Name is a required field!')),
      password: Joi.string().required().error(new Error('Password is a required field!')),
  }
}), 
passport.authenticate('local', {
  failureRedirect: "/login",
  session: false
}), AuthenticationController.loginCreate);

router.get("/auth/googlelogin", passport.authenticate("google", { scope: ["email", "profile"] }));

router.get("/auth/google", passport.authenticate("google",  {
  failureRedirect: '/login',
  session: false
}), AuthenticationController.loginCreate);

router.use(function errors(err, req, res, next) {
  return res.render("authentication/login", { error: "Invalid email & password" })
});

router.use("/jobs", jobRoutes);

module.exports = router;