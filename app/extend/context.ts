// app/extend/context.ts
import { Context } from 'egg'
import { starChartsRender, languageChartsRender } from '../utils/charts-render'
import ChartsOptions from '../entity/ChartsOptions'

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

  async resCharts(
    this: Context,
    data: any[],
    options: ChartsOptions,
    type: 'star' | 'language' = 'star'
  ) {
    let svg = ''
    switch (type) {
      case 'star':
        svg = await starChartsRender(data, options)
        break
      case 'language':
        svg = await languageChartsRender(data, options)
        break
    }
    this.set('content-type', 'image/svg+xml;charset=utf-8')
    this.set('cache-control', 'public, max-age=86400')
    this.set('date', new Date().toDateString())
    this.set('expires', new Date(Date.now() + 3600 * 2 * 1000).toDateString())
    this.body = svg
  },
}
