// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportRepo from '../../../app/controller/repo';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    repo: ExportRepo;
  }
}
