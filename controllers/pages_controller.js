function home(req, res) {
  let userSignedIn = false;
  if (req.session && req.session.user) {
    userSignedIn = true;
  }

  res.render("pages/home", { userSignedIn });
}

module.exports = {
  home
}