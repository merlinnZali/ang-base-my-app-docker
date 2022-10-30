import { APP_NAME, VERSION, Environment } from './environment.interface'

export const environment: Environment = {
    env: 'uat',
    appName: APP_NAME,
    version: VERSION,
    assetsPath: '/assets',
    configPath: '/assets/conf/conf.uat.json',
}
