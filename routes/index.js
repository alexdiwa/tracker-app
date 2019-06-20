const express = require("express");
const router = express.Router();
const jobRoutes = require("./job_routes");
const PagesController = require("./../controllers/pages_controller")
const AuthenticationController = require("./../controllers/authentication_controller");
const { celebrate, Joi } = require("celebrate");

router.get("/", PagesController.home);

router.get("/register", AuthenticationController.registerNew);

router.post("/register", celebrate({
  body: {
    email: Joi.string().required(),
    password: Joi.string().required()
  }
}), AuthenticationController.registerCreate);

router.use("/jobs", jobRoutes);

module.exports = router;