const JobModel = require("./../database/models/job_model");

async function index(req, res) {
  let jobs = await JobModel.find();
  const email = req.session.user.email;
  res.render("job/index", { jobs, email })
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

async function update(req, res) {
  let { id } = req.params;
  let {title, company, description, status, outcome} = req.body;

  await JobModel.findByIdAndUpdate(id, {title, company, description, status, outcome});
  res.redirect(`/jobs/${id}`);
}

async function edit(req, res) {
  let { id } = req.params;
  const job = await JobModel.findById(id);
  res.render("job/edit", { job });
}


module.exports = {
  index,
  create,
  make,
  show,
  destroy,
  update,
  edit
}