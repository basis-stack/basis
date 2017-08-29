import { Controller, Get } from 'basis-server';

@Controller('/')
export default class HomeController {

  @Get()
  root(req, res, next) {

    res.render('app', { title: 'Basis' });
  }
}