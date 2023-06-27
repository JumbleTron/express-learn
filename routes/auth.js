import '../config/passport.js';
import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const authRouter = express.Router();
authRouter.post('/login', function (req, res) {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Incorrect email or password.',
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(user, 'your_jwt_secret');

      return res.json({ token });
    });
  })(req, res);
});

export default authRouter;
