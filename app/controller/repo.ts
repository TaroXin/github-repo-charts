import { Controller } from 'egg'
import { getStarList } from '../utils/star'

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

    const { repo, owner } = params.value

    const cacheKey = `${owner}/${repo}`
    const cacheData = await app.redis.get(cacheKey)
    let starList: any[] = []
    if (cacheData) {
      starList = JSON.parse(cacheData)
    } else {
      starList = await getStarList(app, repo, owner)
      await app.redis.set(
        cacheKey,
        JSON.stringify(starList),
        'EX',
        3600 * 2 // redis 缓存请求结果 2小时
      )
    }
    ctx.resSucc({
      list: starList,
    })
  }
}
