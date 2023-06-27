import passport from 'passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    (email, password, cb) => {
      if (email !== 'admin@mail.com' || password !== 'admin123') {
        return cb(null, false);
      }

      return cb(null, { id: 1, email, roles: ['admin'] });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret',
    },
    function (jwtPayload, cb) {
      if (jwtPayload.id === 1) {
        return cb(null, { id: 1, email: 'admin@mail.com', roles: ['admin'] });
      }

      return cb('Error');
    }
  )
);
