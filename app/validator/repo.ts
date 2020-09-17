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
      showTitle: Joi.boolean().default(true),
      showSubtitle: Joi.boolean().default(true),
      from: Joi.string().valid('star', 'fork').default('star'),
    }),

    languageChart: Joi.object().keys({
      login: Joi.string().required(),
    }),
  }
}
