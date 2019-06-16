const JobModel = require("./../database/models/job_model");

async function index(req, res) {
  let jobs = await JobModel.find();
  res.render("job/index", {jobs})
}

async function make(req, res) {
  res.render("job/new")
}

async function create(req, res) {
  let {title, company, description, status, outcome} = req.body;
  await JobModel.create({ title, company, description, status, outcome })
    .catch(err => res.status(500).send(err));

  res.redirect("/jobs");
}

async function show(req, res) {
  let { id } = req.params;
  let job = await JobModel.findById(id);
  res.render("job/show", { job });
}

async function destroy(req, res) {
  let { id } = req.params;
  await JobModel.findByIdAndRemove(id);
  res.redirect("/jobs");
}


module.exports = {
  index,
  create,
  make,
  show,
  destroy
}