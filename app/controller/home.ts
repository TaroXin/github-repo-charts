import { Controller } from 'egg'
/**
 * @controller Home 首页管理
 */
export default class HomeController extends Controller {
  public async test() {
    const { ctx } = this

    // 获取该项目的第一个和最后一个 star
    // 切分时间节点为10份或者可定义的份数
    // 然后根据时间节点获取

    ctx.resSucc({
      result: 'Get it',
    })
  }
}
