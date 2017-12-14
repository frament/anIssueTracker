import {Injectable, Query} from '@angular/core';
import {ParseSpr} from '../sprs/parse-spr';
import {Object as ParseObject} from 'parse';
import {Issue} from '../classes/Issue';
import {Observable} from "rxjs/Observable";

@Injectable()
export class IssueServise extends ParseSpr {
  constructor() {
    super('Issue', {storeLocal: false, index: 'objectId'});
    super.clearOnlyLocal();
    this.load({});
  }
  loadMap(obj: ParseObject): Issue {
    const result = new Issue();
    Object.keys(result).forEach((key) => {
      key !== 'objectId' ? result[key] = obj.get(key) : result[key] = obj.id;
    });
    return result;
  }
}
