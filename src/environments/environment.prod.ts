import { APP_NAME, Environment } from "./environment.interface";

export const environment : Environment = {
  env: "prod",
  appName: APP_NAME,
  assetsPath: '/assets',
  configPath: '/assets/conf/conf.prod.json'
};
