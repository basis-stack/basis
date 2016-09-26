import jsonfile from 'jsonfile';

import container from './services/container';
import { Config } from './services/config';
import { Logger } from './services/logger';

const config = new Config(jsonfile.readFileSync(`${__dirname}/../settings.json`));

container.register('config', config);
container.register('logger', new Logger(config));
