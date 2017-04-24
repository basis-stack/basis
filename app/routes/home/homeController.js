export default class HomeController {

  constructor(router) {

    router.get('/', this._handleRoot);
  }

  static initialise(router) {

    return new HomeController(router);
  }

  _handleRoot(req, res, next) {

    res.send('Hello World!');
  }
}