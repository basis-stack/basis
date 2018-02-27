import HomeController from './homeController';

export default {

  initRoutes: (router, container, passport) => {

    HomeController.initialise(router, container, passport);
  }
};