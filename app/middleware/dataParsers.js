import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

export const getJsonParser = () => { return bodyParser.json(); };
export const getUrlencodedParser = () => { return bodyParser.urlencoded({ extended: false }); };
export const getCookieParser = () => { return cookieParser(); };