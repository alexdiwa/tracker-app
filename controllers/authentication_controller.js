const UserModel = require("./../database/models/user_model");

function registerNew(req, res) {
  res.render("authentication/register");
}

async function registerCreate(req, res) {
  const { email, password } = req.body;
  const user = await UserModel.create({ email, password });

  req.login(user, (err) => {
    if (err) {
        return next(err);
    }

    res.redirect("/jobs");
  });
}

function logout(req, res) {
  req.logout();
  res.redirect("/");
}

function loginNew(req, res) {
  res.render("authentication/login");
}

async function loginCreate(req, res) {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  console.log("here");

  if (!user) {
    return res.render("authentication/login", { error: "Invalid email & password" });
  }

  const valid = await user.verifyPassword(password);

  if (!valid) {
    return res.render("authentication/login", { error: "Invalid email & password" });
  }

  req.user = user;
  res.redirect("/jobs");
}

module.exports = {
  registerNew,
  registerCreate,
  logout,
  loginNew,
  loginCreate
}