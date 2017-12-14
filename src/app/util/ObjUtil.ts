import {Object as ParceObject} from 'parse';
export class ObjUtil {
  convertObj<T>(obj: ParceObject): T {
    const result: Object = {};
    Object.keys(obj).forEach((key) => {
      result[key] = obj.get(key);
    });
    return result as T;
  }
}
