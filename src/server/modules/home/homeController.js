import assignDeep from 'object-assign-deep';
import cors from 'cors';

import { Api, Controller, Get, Middleware } from 'basis-server/decorators';
import { TestScheduler } from 'rxjs';

export default
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

    //const clientConfig = assignDeep({}, this._config.shared, this._config.client);

    return { ...this._config.shared, ...this._config.client };
  }

  @Get('test')
  test() {
    
    return new Promise((resolve, reject) => {

      resolve('Timmy');
    });
  }
}