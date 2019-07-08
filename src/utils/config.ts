import * as dotenv from 'dotenv';

function init() {
  dotenv.config({path: process.env.DOTENV_CONFIG_PATH});
}

export enum KnownConfigKey {
  JwtSecret = 'JWT_SIGN_SECRET',
  ServerPort= 'SERVER_PORT',
  DbServer = 'DB_SERVER',
}

function get(key: string, defoultPort: string = ''): string {
  return process.env[key] || defoultPort;
}

export default {
  get,
  init,
};
