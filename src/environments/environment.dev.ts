import { APP_NAME, Environment } from "./environment.interface";

export const environment : Environment = {
  production: false,
  appName: APP_NAME,
  assetsPath: '/assets',
  configPath: '/assets/conf/conf.dev.json'
};