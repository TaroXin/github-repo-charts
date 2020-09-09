import { EggPlugin } from 'egg'

const plugin: EggPlugin = {
  cors: {
    enable: true,
    package: 'egg-cors',
  },

  joi: {
    enable: true,
    package: 'egg-joi',
  },
}

export default plugin
