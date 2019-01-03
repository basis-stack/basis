import cors from 'cors';

import { Controller, Get, Middleware } from 'basis-server/decorators';

@Controller('/')
@Middleware(cors())
class HomeController {

  constructor(container) {

    this._config = container.resolve(container.instanceKeys.config);
  }

  @Get()
  root({ res }) {

    res.render('app', { title: 'Basis' });
  }

  @Get('config')
  getClientConfig() {

    return { ...this._config.shared, ...this._config.client };
  }
}

export default HomeController;