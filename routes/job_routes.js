const express = require("express");
const router = express.Router();
const JobController = require("./../controllers/job_controller");

router.get("/", JobController.index);
router.get("/new", JobController.make);
router.post("/", JobController.create);
router.get("/:id", JobController.show);
router.delete("/:id", JobController.destroy);
router.put("/:id", JobController.update);
router.patch("/:id", JobController.update);
router.get("/:id/edit", JobController.edit);

module.exports = router;