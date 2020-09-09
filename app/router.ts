import { Application } from 'egg'

export default (app: Application) => {
  // const { controller, router, jwt } = app
  const { controller, router } = app

  router.get('/', controller.home.test)
}
