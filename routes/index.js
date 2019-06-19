const express = require("express");
const router = express.Router();
const jobRoutes = require("./job_routes");
const PagesController = require("./../controllers/pages_controller")

router.get("/", PagesController.home);

router.use("/jobs", jobRoutes);

module.exports = router;