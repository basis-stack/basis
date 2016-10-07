import jsonfile from 'jsonfile';

import container from './services/container';
import { Config } from './services/config';
import { WinstonProvider } from './services/winstonProvider';
import { Logger } from './services/logger';

const config = new Config(jsonfile.readFileSync(`${__dirname}/../settings.json`));
const winston = WinstonProvider.getInstance(config);

container.register('config', config);
container.register('logger', new Logger(winston));