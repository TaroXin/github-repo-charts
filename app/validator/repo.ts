import { Application } from 'egg'

export default (app: Application) => {
  const { Joi } = app

  return {
    // Joi常用的验证类型
    starChart: Joi.object().keys({
      repo: Joi.string().required(),
      owner: Joi.string().required(),
      title: Joi.string(),
      subtitle: Joi.string(),
    }),
  }
}
