import { Controller } from 'egg'

export default class HomeController extends Controller {
  public async test() {
    const { ctx } = this

    const totalCount = await ctx.service.star.getStarTotalCount(
      'vue-pretty-logger',
      'TaroXin'
    )

    const res = await ctx.service.star.getStarListWithREST(
      'vue-pretty-logger',
      'TaroXin',
      totalCount
    )

    ctx.resSucc({
      result: 'Get it',
      length: res,
    })
  }
}
