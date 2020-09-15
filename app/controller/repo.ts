import { Controller } from 'egg'

export default class RepoController extends Controller {
  /**
   * @name 获取仓库的Star成长图表
   * @router get /repo-charts/api/repo/starChart
   */
  public async starChart() {
    const { ctx, app } = this
    const params = ctx.validate(app.validator.repo.starChart, ctx.query, {
      allowUnknown: true,
    })

    const { repo, owner, title, subtitle } = params.value

    const cacheKey = `${owner}/${repo}`
    const cacheData = await app.redis.get(cacheKey)
    let starList: any[] = []
    if (cacheData) {
      starList = JSON.parse(cacheData)
    } else {
      const totalCount = await ctx.service.star.getStarTotalCount(repo, owner)
      starList = await ctx.service.star.getStarListWithREST(
        repo,
        owner,
        totalCount
      )
      await app.redis.set(
        cacheKey,
        JSON.stringify(starList),
        'EX',
        3600 * 2 // redis 缓存请求结果 2小时
      )
    }
    await ctx.resStarCharts(starList, {
      title: title || cacheKey,
      subtitle: subtitle || 'Star成长曲线图',
      theme: 'default',
    })
  }
}
