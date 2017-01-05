import { default as bodyParser } from 'body-parser';
import { default as cookieParserMiddleware } from 'cookie-parser';

export const bodyParserJson = bodyParser.json();
export const bodyParserUrlencoded = bodyParser.urlencoded({ extended: false });
export const cookieParser = cookieParserMiddleware();