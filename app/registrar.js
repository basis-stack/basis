import jsonfile from 'jsonfile';

import { Config } from './services/config';
import { WinstonProvider } from './services/winstonProvider';
import { Logger } from './services/logger';

const configInstance = new Config(jsonfile.readFileSync(`${__dirname}/../settings.json`));
const winston = WinstonProvider.getInstance(configInstance);
const loggerInstance = new Logger(winston);

// TODO: export these as a map !! So can then do registrar.get
// Or better still have the container pull this in and add the items to its map (along with http, express, etc), then just use container
export const config = configInstance;
export const logger = loggerInstance;