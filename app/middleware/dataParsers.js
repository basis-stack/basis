import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

export const getJsonParser = () => bodyParser.json();
export const getUrlencodedParser = () => bodyParser.urlencoded({ extended: false });
export const getCookieParser = () => cookieParser();