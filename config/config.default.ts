import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'
require('dotenv').config({ path: '.env' })

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>

  config.keys = appInfo.name + '_1585035503822_2810'

  config.middleware = []

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ['*'],
  }

  config.cors = {
    origin: '*',
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  }

  config.joi = {
    options: {},
    locale: {
      'zh-cn': {},
    },
    throw: true,
  }

  config.redis = {
    client: {
      port: Number(process.env.REDIS_PORT),
      host: process.env.REDIS_IP,
      password: process.env.REDIS_PASSWORD,
      db: 0,
    },
  }

  return {
    ...config,
  }
}
