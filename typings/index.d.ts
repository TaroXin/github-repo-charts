import 'egg';

declare module 'egg' {
  interface Application {
    jwt: any;
    validator: any;
  }
}
