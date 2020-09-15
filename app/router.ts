import { Application } from 'egg'

export default (app: Application) => {
  // const { controller, router, jwt } = app
  const { controller, router } = app

  router.get('/', controller.home.test)

  // 仓库相关
  const repoRouteBase = '/api/repo'
  router.get(`${repoRouteBase}/starChart`, app.controller.repo.starChart)
}
