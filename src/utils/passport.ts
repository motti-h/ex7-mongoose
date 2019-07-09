import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import config, { KnownConfigKey } from '../utils/config';
import { UserCredential } from '../models';
import { DbCredential } from '../store/credentials';

export function initPassport() {
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, callback) => {
      DbCredential.findOne().byCred(email, password).exec(
        (err, user) => {
          if (user) callback(null, user, {message: 'succeeded'});
          else callback(null, false, {message: 'failed'});
        },
      );
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
