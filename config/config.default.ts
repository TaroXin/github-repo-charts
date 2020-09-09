import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

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

  return {
    ...config,
  }
}
