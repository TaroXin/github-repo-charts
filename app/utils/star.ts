import { Application } from 'egg'

/**
 * 获得 star 数组
 */
export async function getStarList(
  app: Application,
  repo: string,
  owner: string,
  endCursor = '',
  totalCount = 0
) {
  console.log('执行获取Star列表', repo, owner, endCursor)
  const starList: any[] = []
  const query = `
    query($repo: String!, $owner: String!) {
      repository(name: $repo, owner: $owner) {
        stargazers(first: 100${endCursor}) {
          edges {
            starredAt
          }
          pageInfo {
            endCursor
          }
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
    console.log(errors)
    throw new Error(errors)
  }

  starList.push(...data.repository.stargazers.edges)
  const totalStarCount = totalCount || data.repository.stargazers.totalCount
  if (totalStarCount <= 1000 && starList.length < totalStarCount) {
    const secondList = await getStarList(
      app,
      repo,
      owner,
      `, after: "${data.repository.stargazers.pageInfo.endCursor}"`,
      totalStarCount - 100
    )
    console.log(secondList, '获取第二次')
    starList.push(...secondList)
  }
  return starList
}

// 把接口返回的数据格式化成 Echarts 需要的数据
export function formatStarData(data: any[]): any[] {
  return data.map((item, index) => ({
    name: item.starredAt,
    value: [item.starredAt, index + 1],
  }))
}
