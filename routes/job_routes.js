const express = require("express");
const router = express.Router();
const JobController = require("./../controllers/job_controller");
const QuestionController = require("./../controllers/question_controller");
// const { authorise } = require("./../middleware/authorisation_middleware");
const passport = require("passport");

router.get("/", passport.authenticate('jwt', { session: false }), JobController.index);
router.get("/new", passport.authenticate('jwt', { session: false }), JobController.make);
router.post("/", passport.authenticate('jwt', { session: false }), JobController.create);
router.get("/:id", passport.authenticate('jwt', { session: false }), JobController.show);
router.delete("/:id", passport.authenticate('jwt', { session: false }), JobController.destroy);
router.put("/:id", passport.authenticate('jwt', { session: false }), JobController.update);
router.patch("/:id", passport.authenticate('jwt', { session: false }), JobController.update);
router.get("/:id/edit", passport.authenticate('jwt', { session: false }), JobController.edit);
router.post("/:jobId/question", QuestionController.create);

module.exports = router;