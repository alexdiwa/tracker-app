const express = require("express");
const router = express.Router();
const QuestionController = require("./../controllers/question_controller");
const { celebrate, Joi, errors } = require("celebrate");

router.post("/:jobId/question", celebrate({
  body: {
      questionAsked: Joi.string().required().error(new Error('Question is a required field!')),
      myAnswer: Joi.string()
  }
}),QuestionController.create);

// router.use(function errors(err, req, res, next) {
//   console.log(req.body);
//   return res.render("job/show", { error: "Question is required" });
// });

router.use(errors());

module.exports = router;