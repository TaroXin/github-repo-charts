import 'egg';
import { ApolloFetch } from 'apollo-fetch';

declare module 'egg' {
  interface Application {
    jwt: any;
    validator: any;
    apolloFetch: ApolloFetch
  }
}
