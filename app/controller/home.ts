import { Controller } from 'egg'

/**
 * @controller Home 首页管理
 */
export default class HomeController extends Controller {
  public async test() {
    const { ctx } = this
    ctx.resSucc({
      result: 'Get it',
    })
  }
}
