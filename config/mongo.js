import mongoose from 'mongoose';

import { logger } from './winston.js';

mongoose.Promise = Promise;

mongoose.connection.on('error', (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

if (
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === 'local'
) {
  mongoose.set('debug', true);
}

export const initMongDb = (cb) => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      logger.info('mongoDB connected...');
      cb();
    });

  return mongoose.connection;
};
