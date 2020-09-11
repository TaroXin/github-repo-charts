import { Application } from 'egg'
import 'reflect-metadata'
import { createApolloFetch } from 'apollo-fetch'
require('dotenv').config({ path: '.env' })

export default (app: Application) => {
  app.ready(async () => {
    console.log('====== application ready =======')

    const apolloFetch = createApolloFetch({
      uri: 'https://api.github.com/graphql',
    })
    apolloFetch.use(({ options }, next) => {
      if (!options.headers) {
        options.headers = {}
      }
      options.headers[
        'authorization'
      ] = `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`
      next()
    })
    app.apolloFetch = apolloFetch
  })
}
