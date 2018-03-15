import HomeController from './homeController';

export default {

  initRoutes: (router, container) => {

    HomeController.initialise(router, container);
  }
};