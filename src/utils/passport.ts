import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import {store} from '../store';
import config, { KnownConfigKey } from '../utils/config';
import { UserCredential } from '../models';
import CredentialsStore from '../store/credentials';
import { getDb } from '../routesHendlers/store';

export function initPassport() {
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, callback) => {
      const credentials = new CredentialsStore(getDb()!);
      const user = credentials.findByCred(email, password);
      user.then((cred) => {
        callback(null, cred, {message: 'succeeded'});
      }).catch((err) => {
        callback(null, false, {message: 'failed'});
      });
    },
  ));

  passport.use(new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get(KnownConfigKey.JwtSecret),
    },
    // in this case the user credential is actually the same as jwtPayload
    // can consider simply passing jwtPayload, however it might be stale (common though)
    // trade-off: lightweight token vs. required info for most API's to reduce user re-query needs
    (jwtPayload: UserCredential, callback) =>
      callback(null, jwtPayload),
  ));
}
