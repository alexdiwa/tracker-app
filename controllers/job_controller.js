const JobModel = require("./../database/models/job_model");

async function index(req, res) {
  let jobs = await JobModel.find();
  res.render("job/index", {jobs})
}

async function create(req, res) {
  let {title, company, description, status, outcome} = req.body;
  let job = await JobModel.create({ title, company, description, status, outcome })
    .catch(err => res.status(500).send(err));

  res.redirect("/jobs");
}

async function make(req, res) {
  res.render("job/new")
}

module.exports = {
  index,
  create,
  make
}