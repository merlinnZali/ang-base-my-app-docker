import { APP_NAME, VERSION, Environment } from './environment.interface'

export const environment: Environment = {
  env: 'prod',
  appName: APP_NAME,
  version: VERSION,
  assetsPath: '/assets',
  configPath: '/assets/conf/conf.prod.json',
}
