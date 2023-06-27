import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { errorHandler, successHandler } from './config/morgan.js';
import { logger } from './config/winston.js';
import './config/config.js';

const app = express();
const PORT = process.env.PORT || 3000;
const ALLOWED_DOMAIN = process.env.ALLOWED_DOMAIN || '*';
if (process.env.env !== 'test') {
  app.use(successHandler);
  app.use(errorHandler);
}

app.use(helmet());
app.use(cors());
app.options(ALLOWED_DOMAIN, cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (_, res) => {
  res.send('Hello World');
});
app.get('/about*', (_, res) => {
  res.send('About page with *');
});
app.get('/about/me', (_, res) => {
  res.send('About me page');
});
app.get('/about/company', (_, res) => {
  res.send('About company page');
});

app.use((_, res) => {
  res.type('application/json');
  res.status(404);
  res.send({ error: 'Not found' });
});

const server = app.listen(PORT, () => {
  console.log(`Starting Express server on http://localhost:${PORT}`);
});

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
