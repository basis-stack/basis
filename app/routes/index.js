import express from 'express';
import homeController from './../controllers/homeController';
import errorsController from './../controllers/errorsController';

const router = express.Router();

homeController.initialise(router);
errorsController.initialise(router);

export default router;