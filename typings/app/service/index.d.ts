// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportFork from '../../../app/service/fork';
import ExportHome from '../../../app/service/home';
import ExportLanguage from '../../../app/service/language';
import ExportStar from '../../../app/service/star';

declare module 'egg' {
  interface IService {
    fork: AutoInstanceType<typeof ExportFork>;
    home: AutoInstanceType<typeof ExportHome>;
    language: AutoInstanceType<typeof ExportLanguage>;
    star: AutoInstanceType<typeof ExportStar>;
  }
}
