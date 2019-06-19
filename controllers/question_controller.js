const JobModel = require("./../database/models/job_model");

async function create(req, res) {
  let { jobId } = req.params;
  let { questionAsked, myAnswer } = req.body;

  let job = await JobModel.findById(jobId);
  job.questions.push({ questionAsked, myAnswer });

  await job.save();

  res.redirect(`/jobs/${jobId}`);
}

module.exports = {
  create
}