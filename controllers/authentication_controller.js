const UserModel = require("./../database/models/user_model");
const jwt = require("jsonwebtoken")

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
    
    const token = jwt.sign({ sub: req.user._id }, process.env.JWT_SECRET);
    res.cookie("jwt", token);
    res.redirect("/jobs");
  });
}

function logout(req, res) {
  req.logout();
  res.cookie("jwt", null, { maxAge: -1 });
  res.redirect("/");
}

function loginNew(req, res) {
  res.render("authentication/login");
}

async function loginCreate(req, res) {
  const token = jwt.sign({ sub: req.user._id }, process.env.JWT_SECRET);
  res.cookie("jwt", token);
  res.redirect("/jobs");

  // const { email, password } = req.body;
  // const user = await UserModel.findOne({ email });

  // console.log("here");
  // if (!user) {
  //   console.log("now here");
  //   return res.render("authentication/login", { error: "Invalid email & password" });
  // }

  // const valid = await user.verifyPassword(password);

  // if (!valid) {
  //   console.log("now here again");
  //   return res.render("authentication/login", { error: "Invalid email & password" });
  // }

  // req.user = user;
  // res.redirect("/jobs");
}

module.exports = {
  registerNew,
  registerCreate,
  logout,
  loginNew,
  loginCreate
}