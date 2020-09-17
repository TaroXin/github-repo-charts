import { Service } from 'egg'

export default class LanguageService extends Service {
  // 获得仓库语言占比列表
  async getLanguageList(owner: string, repo?: string): Promise<any> {
    const { ctx, app } = this
    const query = `
      query($owner: String!) {
        user(login: $owner) {
          repositories(first: 100) {
            nodes {
              isFork
              languages(first: 10) {
                edges {
                  size
                  node {
                    color
                    name
                    id
                  }
                }
                totalSize
              }
            }
          }
        }
      }
    `

    const repoQuery = `
      query($owner: String!, $repo: String!) {
        user(login: $owner) {
          repository(name: $repo) {
            isFork
            languages(first: 10) {
              edges {
                size
                node {
                  color
                  name
                  id
                }
              }
              totalSize
            }
          }
        }
      }
    `

    const { errors, data } = await app.apolloFetch({
      query: repo ? repoQuery : query,
      variables: repo
        ? {
            owner,
            repo,
          }
        : {
            owner,
          },
    })

    if (errors) {
      const message = errors.length ? errors[0].message : errors
      ctx.resDataError(message)
      throw new Error(message)
    }

    return data
  }
}
