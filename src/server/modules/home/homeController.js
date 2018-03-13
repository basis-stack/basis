import assignDeep from 'object-assign-deep';
import cors from 'cors';

import { Controller, Get, Middleware } from 'basis-server/decorators';

const testMiddleware = (req, res, next) => {

  console.log('Everything is awesome');
  next();
};

@Controller('/')
@Middleware(cors(), testMiddleware)
export default class HomeController {

  constructor(container) {

    this._config = container.resolve(container.instanceKeys.config);
  }

  @Get()
  root(req, res) {

    res.render('app', { title: 'Basis' });
  }

  @Get('config')
  getClientConfig(req, res) {

    const clientConfig = assignDeep({}, this._config.shared, this._config.client);

    res.send(clientConfig);
  }
}