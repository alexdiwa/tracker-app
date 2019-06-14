const JobModel = require("./../database/models/job_model");

async function index(req, res) {
  let jobs = await JobModel.find();
  res.render("job/index", {jobs})
}

module.exports = {
  index
}