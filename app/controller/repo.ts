import { Controller } from 'egg'
import { formatLanguageList } from '../utils'

export default class RepoController extends Controller {
  /**
   * @name 获取仓库的Star成长图表
   * @router get /api/repo/starChart
   */
  public async starChart() {
    const { ctx, app } = this
    const params = ctx.validate(app.validator.repo.starChart, ctx.query, {
      allowUnknown: true,
    })

    const {
      repo,
      owner,
      title,
      subtitle,
      showTitle,
      showSubtitle,
      from,
    } = params.value

    const repoFullname = `${owner}/${repo}`
    const cacheKey = `${repoFullname}/${from}`
    const cacheData = await app.redis.get(cacheKey)
    let dataList: any[] = []
    if (cacheData) {
      dataList = JSON.parse(cacheData)
    } else {
      if (from === 'star') {
        const [
          totalCount,
          createdAt,
        ] = await ctx.service.star.getStarTotalCount(repo, owner)
        dataList = await ctx.service.star.getStarListWithREST(
          repo,
          owner,
          totalCount,
          createdAt
        )
        await app.redis.set(
          cacheKey,
          JSON.stringify(dataList),
          'EX',
          3600 * 2 // redis 缓存请求结果 2小时
        )
      } else {
        const [
          totalCount,
          createdAt,
        ] = await ctx.service.fork.getStarTotalCount(repo, owner)
        dataList = await ctx.service.fork.getForkListWithREST(
          repo,
          owner,
          totalCount,
          createdAt
        )
        await app.redis.set(
          cacheKey,
          JSON.stringify(dataList),
          'EX',
          3600 * 2 // redis 缓存请求结果 2小时
        )
      }
    }

    const defaultSubtitle =
      from === 'star' ? 'Star成长曲线图' : 'Fork成长曲线图'
    await ctx.resCharts(dataList, {
      title: title || repoFullname,
      subtitle: subtitle || defaultSubtitle,
      theme: 'default',
      showTitle,
      showSubtitle,
    })
  }

  /**
   * @name 获取语言饼图
   * @router get /api/repo/languageChart
   */
  public async languageChart() {
    const { ctx, app } = this
    const params = ctx.validate(app.validator.repo.languageChart, ctx.query, {
      allowUnknown: true,
    })

    const { login } = params.value

    const cacheKey = `language/${login}`
    const cacheData = await app.redis.get(cacheKey)
    let dataList: any[] = []
    let colors: string[] = []
    let legendItems: string[] = []
    if (cacheData) {
      const [nodes, colorNodes, items] = formatLanguageList(
        JSON.parse(cacheData)
      )
      dataList = nodes
      colors = colorNodes
      legendItems = items
    }

    await ctx.resCharts(
      dataList,
      {
        title: `${login}'s Language`,
        subtitle: '',
        showTitle: true,
        showSubtitle: true,
        theme: 'default',
        colors,
        legendItems,
      },
      'language'
    )
  }
}
