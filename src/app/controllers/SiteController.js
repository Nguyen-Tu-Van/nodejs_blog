class NewsController {
  // [GET] / search
  search(req, res) {
    res.render('search');
  }

  // [GET] / home
  home(req, res) {
    res.render('home');
  }
}

module.exports = new NewsController();
