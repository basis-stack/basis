import { Controller, Get, Post } from './../../core/decorators';

@Controller('/')
export default class HomeController {

  @Get()
  root(req, res, next) {

    res.render('app', { title: 'Basis' });
  }
}