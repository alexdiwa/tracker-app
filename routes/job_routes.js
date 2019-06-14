const express = require("express");
const router = express.Router();
const JobController = require("./../controllers/job_controller");

router.get("/", JobController.index);
router.post("/", JobController.create);
router.get("/new", JobController.make);

module.exports = router;