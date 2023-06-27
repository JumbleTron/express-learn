import passport from 'passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';

import { User } from '../models/user.model.js';
import { logger } from './winston.js';

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, cb) => {
      const user = await User.findOne({ email }).exec();
      if (!user) {
        return cb(null, false);
      }
      user
        .passwordMatches(password)
        .then((isMatch) => {
          if (isMatch) {
            return cb(null, {
              id: user.id,
              role: user.role,
              email: user.email,
            });
          }

          return cb(null, false);
        })
        .catch((err) => {
          logger.error(err);

          return cb(null, false);
        });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret',
    },
    async function (jwtPayload, cb) {
      try {
        const user = await User.findById(jwtPayload.id).exec();
        if (user) return cb(null, user);

        return cb(null, false);
      } catch (error) {
        return cb(error, false);
      }
    }
  )
);
