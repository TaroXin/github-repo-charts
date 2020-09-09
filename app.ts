import { Application } from 'egg'
import 'reflect-metadata'

export default (app: Application) => {
  app.ready(async () => {
    console.log('====== application ready =======')
  })
}
