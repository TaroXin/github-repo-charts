import { Service } from 'egg'
import { RequestOptions2 as RequestOptions } from 'urllib'

export default class HomeService extends Service {
  // 获得Star总数目
  async getStarTotalCount(repo: string, owner: string): Promise<number> {
    const { ctx, app } = this
    const query = `
      query($repo: String!, $owner: String!) {
        repository(name: $repo, owner: $owner) {
          stargazers {
            totalCount
          }
        }
      }
    `

    const { errors, data } = await app.apolloFetch({
      query,
      variables: {
        repo,
        owner,
      },
    })

    if (errors) {
      const message = errors.length ? errors[0].message : errors
      ctx.resDataError(message)
      throw new Error(message)
    }

    return data.repository.stargazers.totalCount
  }

  // 获取 Star 列表
  async getStarListWithREST(
    repo: string,
    owner: string,
    totalCount: number
  ): Promise<any[]> {
    console.log('获取仓库Star列表', `${owner}/${repo}`)

    const { ctx } = this
    const page = 1
    const options: RequestOptions = {
      headers: {
        Accept: 'application/vnd.github.v3.star+json',
        Authorization: 'bearer ' + process.env.GITHUB_ACCESS_TOKEN,
      },
      contentType: 'json',
      timeout: 1000 * 60,
      retry: 7,
    }

    let promises: Promise<any>[] = []
    if (totalCount <= 1000) {
      promises = new Array(Math.ceil(totalCount / 100)).fill(null)
      promises = promises.map((_, index) => {
        return new Promise(async (resolve) => {
          const res = await ctx.curl(
            `https://api.github.com/repos/${owner}/${repo}/stargazers?page=${
              index + 1
            }&per_page=100`,
            options
          )
          resolve(JSON.parse(res.data.toString()))
        })
      })
    }

    let data: any[] = []
    if (promises.length) {
      const list = await Promise.all(promises)
      list.forEach((item) => data.push(...item))
    } else {
      const res = await ctx.curl(
        `https://api.github.com/repos/${owner}/${repo}/stargazers?page=${page}&per_page=100`,
        options
      )
      data = res.data
    }

    return data.map((item, index) => ({
      name: item.starred_at,
      value: [item.starred_at, index + 1],
    }))
  }
}
