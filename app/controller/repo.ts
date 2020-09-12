import { Controller } from 'egg'
import { getStarList } from '../utils/star'

export default class RepoController extends Controller {
  /**
   * @name 获取仓库的Star成长图表
   * @router get /repo-charts/api/repo/starChart
   */
  public async starChart() {
    const { ctx, app } = this
    const list = await getStarList(app, 'open-source', 'juejin-im')
    ctx.resSucc(list)
  }
}
