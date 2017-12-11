import {BaseSpr, getOptions, sprOptions} from "./base-spr";
import {Object as ParseObject} from 'parse';

export class ParseSpr extends BaseSpr{
  private parseObj = Object;
  constructor(name:string,options:sprOptions){
    super(name,options);
    let tempObj = Parse.Object.extend(name);
    this.parseObj = new tempObj();
  }
  add(item:any):void{
    super.add(item);
  }
  update(item:any):void{
    super.update(item);
  }
  remove(item):void{
    super.remove(item)
  }
  clear():void{
    super.clear()
  };
  sunc():void{}
  load():void{}
  loadAll():void{}
}
