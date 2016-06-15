class HomeController {

    initialise(router) {

        router.get('/', (req, res, next) => {
            res.send('Hello World!');
        });
    }
}

export default new HomeController();