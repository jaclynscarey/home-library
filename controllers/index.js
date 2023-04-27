function home(req, res) {
  res.render('index', { title: 'Little Book Worms' });
}

module.exports = { home };
