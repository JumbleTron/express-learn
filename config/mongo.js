import mongoose from 'mongoose';
import { envs } from './config.js';

import { logger } from './winston.js';

mongoose.connection.on('error', (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

if (envs.i) {
  mongoose.set('debug', true);
}

export const initMongDb = (cb) => {
  mongoose
    .connect(envs.mongo.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      logger.info('mongoDB connected...');
      cb();
    });

  return mongoose.connection;
};
