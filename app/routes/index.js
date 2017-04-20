import express from 'express';
import { HomeController } from './home/homeController';

let homeController;

export default () => {

  const router = express.Router();
  homeController = HomeController.initialise(router);

  return router;
}