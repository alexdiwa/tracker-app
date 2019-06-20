const express = require("express");
const router = express.Router();
const jobRoutes = require("./job_routes");
const PagesController = require("./../controllers/pages_controller")
const AuthenticationController = require("./../controllers/authentication_controller");
const { celebrate, Joi } = require("celebrate");
const { authRedirect } = require("./../middleware/authorisation_middleware");
const passport = require("passport");

router.get("/", PagesController.home);

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
      email: Joi.string().required(),
      password: Joi.string().required()
  }
}), 
passport.authenticate('local', {
  successRedirect: "/jobs",
  failureRedirect: "/login"
}));

router.use("/jobs", jobRoutes);

module.exports = router;