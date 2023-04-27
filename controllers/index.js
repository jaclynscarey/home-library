function home(req, res) {
  res.render('index', { title: 'Little Bookworms' });
}

module.exports = { home };
