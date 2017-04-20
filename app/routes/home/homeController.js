export class HomeController {

  static initialise(router) {

    const instance = new HomeController();

    router.get('/', instance._handleRoot);

    return instance;
  }

  _handleRoot(req, res, next) {

    res.send('Hello World!');
  }
}