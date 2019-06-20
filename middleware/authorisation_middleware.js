function authRedirect(req, res, next) {
  if (req.session && req.session.user) {
    return res.redirect("/jobs");
  }

  return next();
}

function authorise(req, res, next) {
  if (req.session.user) {
    return next();
  }

  return res.redirect("/");
}


module.exports = {
  authRedirect,
  authorise
}