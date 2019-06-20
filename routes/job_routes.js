const express = require("express");
const router = express.Router();
const JobController = require("./../controllers/job_controller");
const QuestionController = require("./../controllers/question_controller");
const { authorise } = require("./../middleware/authorisation_middleware");

router.get("/", authorise, JobController.index);
router.get("/new", JobController.make);
router.post("/", JobController.create);
router.get("/:id", JobController.show);
router.delete("/:id", JobController.destroy);
router.put("/:id", JobController.update);
router.patch("/:id", JobController.update);
router.get("/:id/edit", JobController.edit);
router.post("/:jobId/question", QuestionController.create);

module.exports = router;