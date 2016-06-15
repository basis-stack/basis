import express from 'express';
import homeController from './../controllers/homeController';

const router = express.Router();

homeController.initialise(router);

export default router;