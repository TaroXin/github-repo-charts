// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import { Repository, Connection, TreeRepository } from 'typeorm';
import AppEntityHome from '../app/entity/Home';
declare module 'egg' {
  interface Context {
    entity: {
      Home: typeof AppEntityHome
      default: {
        Home: typeof AppEntityHome
      }
    }
    repo: {
      Home: Repository<AppEntityHome>
      default: {
        Home: Repository<AppEntityHome>
      }
    }
  }
}