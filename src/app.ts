import path from 'path';
import express from 'express';
import cors from 'cors';
import {routeConfig} from './routes/routeConfig';
import expressWinston from 'express-winston';
import winston from 'winston';
import * as middle from './utils/middleware';
import {initPassport} from './utils/passport';
import exphbs from 'express-handlebars';
import storeMiddleware from './routesHendlers/store';
const alignedWithColorsAndTime = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf((info) => {
    const {
      timestamp, level, message, ...args
    } = info;

    const ts = timestamp.slice(0, 19).replace('T', ' ');
    return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
  }),
);
initPassport();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/public', express.static(path.join(__dirname, 'public')));
app.use(expressWinston.logger({
  transports: [new winston.transports.Console()],
  format: alignedWithColorsAndTime,
}));

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
defaultLayout: 'main',
helpers: {
increment: (v: number) => v + 1,
},
}));
app.set('view engine', 'handlebars');
app.use(storeMiddleware());
Object.keys(routeConfig).forEach((k) => {
    const routeConf = routeConfig[k];
    app.use(routeConf.prefix, routeConf.router);
  });

app.use(expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: alignedWithColorsAndTime,
}));

app.use(middle.endError);

export { app };
