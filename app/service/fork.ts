import { Service } from 'egg'
import { RequestOptions2 as RequestOptions } from 'urllib'

export default class FormService extends Service {
  // 获得Fork总数目 [totalCount, createdAt]
  async getStarTotalCount(
    repo: string,
    owner: string
  ): Promise<[number, string]> {
    const { ctx, app } = this
    const query = `
      query($repo: String!, $owner: String!) {
        repository(name: $repo, owner: $owner) {
          createdAt
          forks {
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

    return [data.repository.forks.totalCount, data.repository.createdAt]
  }

  // 获取 Fork 列表
  async getForkListWithREST(
    repo: string,
    owner: string,
    totalCount: number,
    createdAt: string
  ): Promise<any[]> {
    console.log('获取仓库Fork列表', `${owner}/${repo}`)

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

    const url = `https://api.github.com/repos/${owner}/${repo}/forks`
    let promises: Promise<any>[] = []
    if (totalCount <= 500) {
      promises = new Array(Math.ceil(totalCount / 100)).fill(null)
      promises = promises.map((_, index) => {
        return new Promise(async (resolve) => {
          const res = await ctx.curl(
            `${url}?page=${index + 1}&per_page=100&sort=oldest`,
            options
          )
          resolve(JSON.parse(res.data.toString()))
        })
      })
    } else {
      // Forks 也500个
      promises = new Array(5).fill(null)
      promises = promises.map((_, index) => {
        return new Promise(async (resolve) => {
          const res = await ctx.curl(
            `${url}?page=${index + 1}&per_page=100&sort=oldest`,
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

    // 第一个 Fork 为 0 的时候应该是项目创建的时候
    // eslint-disable-next-line @typescript-eslint/camelcase
    data.unshift({ created_at: createdAt })
    return data.map((item, index) => ({
      name: item.created_at,
      value: [item.created_at, index],
    }))
  }
}
