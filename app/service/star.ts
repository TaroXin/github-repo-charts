import { Service } from 'egg'
import { RequestOptions2 as RequestOptions } from 'urllib'

export default class StarService extends Service {
  // 获得Star总数目 [totalCount, createdAt]
  async getStarTotalCount(
    repo: string,
    owner: string
  ): Promise<[number, string]> {
    const { ctx, app } = this
    const query = `
      query($repo: String!, $owner: String!) {
        repository(name: $repo, owner: $owner) {
          createdAt
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

    return [data.repository.stargazers.totalCount, data.repository.createdAt]
  }

  // 获取 Star 列表
  async getStarListWithREST(
    repo: string,
    owner: string,
    totalCount: number,
    createdAt: string
  ): Promise<any[]> {
    console.log('获取仓库Star列表', `${owner}/${repo}`)

    const { ctx } = this
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
    if (totalCount <= 500) {
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
    } else {
      // 对大于1000star的项目采用抽样形式，无法做到较为精确
      // 抽样有限制，Github API限制页数过多的请求，不知道怎么解决
      // 1000 个也搞不了，哎，五百个吧😌
      promises = new Array(5).fill(null)
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

    const data: any[] = []
    if (promises.length) {
      const list = await Promise.all(promises)
      list.forEach((item) => data.push(...item))
    }

    // 第一个Star为0的时候应该是项目创建的时候
    // eslint-disable-next-line @typescript-eslint/camelcase
    data.unshift({ starred_at: createdAt })
    return data.map((item, index) => ({
      name: item.starred_at,
      value: [item.starred_at, index],
    }))
  }
}
