import passport from 'passport';

const verifyCallback =
  (req, resolve, reject, requiredRight) => async (err, user, info) => {
    if (err || info || !user) {
      return reject(401);
    }

    if (!requiredRight) {
      resolve();
    }

    if (!((user.role & requiredRight) === requiredRight)) {
      return reject(403);
    }

    resolve();
  };

export const authorization = (requiredRight) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      'jwt',
      { session: false },
      verifyCallback(req, resolve, reject, requiredRight)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => {
      res.status(err);
      if (err === 401) {
        res.json({ error: 'Unauthorized' });
      }
      if (err === 403) {
        res.json({ error: 'Forbidden' });
      }
    });
};
