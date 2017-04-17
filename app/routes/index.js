import express from 'express';
import { HomeController } from './home/homeController';

let homeController;

export default () => {

  const router = express.Router();
  homeController = new HomeController();
  homeController.initialise(router);

  return router;
}