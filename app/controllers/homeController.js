class HomeController {

   initialise(router) {

      router.get('/', this._handleRoot);
   }

   _handleRoot(req, res, next) {

      res.send('Hello World!');
   }
}

export default new HomeController();