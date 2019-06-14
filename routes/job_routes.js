const express = require("express");
const router = express.Router();
const JobController = require("./../controllers/job_controller");

router.get("/", JobController.index);

module.exports = router;