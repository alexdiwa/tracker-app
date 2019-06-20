function home(req, res) {
  req.session.views = req.session.views ? req.session.views + 1 : 1;
  res.json(req.session.views);
}

module.exports = {
  home
}