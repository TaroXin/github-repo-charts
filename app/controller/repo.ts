import { Controller } from 'egg'

export default class RepoController extends Controller {
  /**
   * @name 获取仓库的Star成长图表
   * @router get /repo-charts/api/repo/starChart
   */
  public async starChart() {
    const { ctx, app } = this
    // 获取该项目的第一个和最后一个 star
    // 切分时间节点为10份或者可定义的份数
    // 然后根据时间节点获取
    const query = `
      query {
        repository(name: "vue", owner: "vuejs") {
          stargazers(first: 100) {
            edges {
              starredAt
            }
            totalCount
          }
        }
      }
    `
    const result = await app.apolloFetch({
      query,
    })

    const { errors, data } = result
    if (errors) {
      ctx.resFail(errors)
      return
    }

    console.log(data)

    ctx.resSucc({
      result: 'Get it',
    })
  }
}
