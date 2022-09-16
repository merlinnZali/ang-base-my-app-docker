import { APP_NAME, Environment } from "./environment.interface";

// this will be use when we run: npm start instead of environment.ts
export const environment : Environment = {
  env: "dev",
  appName: APP_NAME,
  assetsPath: '/assets',
  configPath: '/assets/conf/conf.dev.json'
};