import { Application } from 'egg'

export default (app: Application) => {
  const { Joi } = app

  return {
    // Joi常用的验证类型
    index: Joi.object()
      .keys({
        // 3 - 30 个 数字、字符
        username: Joi.string().alphanum().min(3).max(30).required(),
        // 3 - 30 位 字母数字组合密码
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        // string || number 都可以通过
        accessToken: [Joi.string(), Joi.number()],
        // 生日限制
        birthyear: Joi.number().integer().min(1900).max(2018),
        // email 限制
        email: Joi.string().email(),
        // URI限制
        website: Joi.string().uri({
          scheme: ['git', /git\+https?/],
        }),
        // ==== 允许为空/ 否认不允许为空 ====
        search: Joi.string().allow(''),
        // 验证枚举值，如果不传，默认为all
        type: Joi.string().valid('disabled', 'normal', 'all').default('all'),
        // 开始时间 会自动格式化
        startTime: Joi.date().min('1-1-1974').max('now'),
        // 结束时间 必须大于开始时间，小于2100
        endTime: Joi.when(Joi.ref('startTime'), {
          is: Joi.date().required(),
          then: Joi.date().max('1-1-2100'),
        }),
        // 页码 限制最小值
        page: Joi.number().integer().min(1).default(1),
        pageSize: Joi.number().integer().default(8),
        //
        deleteWhenLtTen: Joi.number().integer().max(10).strip(),
        // 数组中包含某个字段 && 数字
        arrayString: Joi.array().items(
          // 数组中必须包含 name1
          Joi.string().label('name1').required(),
          // 数组中必须包含 数字
          Joi.number().required(),
          // 数组中可以包含其他类型，如bool, 但是最终结果会==除掉【以上类型的以外字段】
          Joi.any().strip()
        ),
        // 数组对象, 如需其参考以上字段
        arrayObject: Joi.array().items(
          Joi.object().keys({
            age: Joi.number().integer().max(200),
            sex: Joi.boolean(),
          })
        ),
      })
      // with 中必须同时存在某些字段，故不可以填写一个参数
      .with('username', 'password')
      // .without() 同理，不可以一个字段，不能同时存在
      .without('a', 'b'),
  }
}
