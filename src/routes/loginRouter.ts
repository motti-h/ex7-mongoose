import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { IVerifyOptions } from 'passport-local';
import config, { KnownConfigKey } from '../utils/config';

const loginRouter = express.Router();
const jwtSecret = config.get(KnownConfigKey.JwtSecret);

loginRouter.post('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  passport.authenticate('local', {session: false}, (err: Error, user: any, info: IVerifyOptions) => {
    if (err || !user) {
      return res.status(400).send({
        message: 'Failed',
        user,
      });
    }

    req.login(user, {session: false}, (error) => {
      if (error) {
        res.send(error);
      }

      const token = jwt.sign(user, jwtSecret);
      return res.send({user, token});
    });
  })(req, res);
});

export {loginRouter};
