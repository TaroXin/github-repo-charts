// app/extend/context.ts
import { Context } from 'egg'

export default {
  resSucc(this: Context, data: Record<string, any> = {}) {
    this.body = {
      code: 0,
      data,
    }
  },

  resFail(this: Context, message: string) {
    this.body = {
      code: 30001,
      message,
    }
  },

  resParamError(this: Context, message = '请求参数不符合接口规则') {
    this.body = {
      code: 30002,
      message,
    }
  },

  resDataError(this: Context, message = '请求参数错误', code = 30003) {
    this.body = {
      code,
      message,
    }
  },
}
