const express = require("express");
const router = express.Router();
const jobRoutes = require("./job_routes");

router.use("/jobs", jobRoutes);

module.exports = router;