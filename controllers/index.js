function home(req, res) {
  res.render('index', { title: 'Home Library' });
}

module.exports = { home };
