import {Injectable} from '@angular/core';
import {ParseSpr} from '../sprs/parse-spr';
import {Object as ParseObject, Query} from 'parse';
import {Issue} from '../classes/Issue';
import {Comment} from "../classes/Comment";


@Injectable()
export class IssueServise extends ParseSpr {
  constructor() {
    super('Issue', {storeLocal: false, index: 'objectId'});
    super.clearOnlyLocal();
    /*
    this.load({});
    */
  }
  loadMap(obj: ParseObject): Issue {
    const result = new Issue();
    Object.keys(result).forEach((key) => {
      key !== 'objectId' ? result[key] = obj.get(key) : result[key] = obj.id;
    });
    return result;
  }
  getComments(idIssue: string): Promise<Comment[]> {
    return new Promise<Comment[]>(((resolve, reject) => {
    let result: Comment[] = [];
      let issue = ParseObject.extend('Issue');
      let issueQuery = new Query(issue);
      issueQuery.equalTo('objectId', idIssue);
      let comment = ParseObject.extend('Comment');
      let commentQuery = new Query(comment);
      commentQuery.matchesQuery('IdIssue', issueQuery);
      commentQuery.include('IdUser');
      commentQuery.find().then((res) => {
        resolve(res.map((obj) => {
            let mapRes = new Comment();
            Object.keys(mapRes).forEach((key) => {
              switch (key){
                case 'objectId':{
                  mapRes[key] = obj.id;
                  break;
                }
                case 'username':{
                  mapRes[key] = obj.get('IdUser').get('username');
                  break;
                }
                default:{
                  mapRes[key] = obj.get(key);
                  break;
                }
              }
              //key !== 'objectId' ? mapRes[key] = obj.get(key) : mapRes[key] = obj.id;
            });
            return mapRes;
          }));
        }
      )
    //return result;
    }))
    }
}
