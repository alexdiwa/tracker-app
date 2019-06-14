const mongoose = require("mongoose");
const JobSchema = require("./../schemas/job_schema");
const JobModel = mongoose.model("job", JobSchema);

module.exports = JobModel;