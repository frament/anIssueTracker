import {BaseSpr, getOptions, sprOptions} from "./base-spr";
import {Object as ParseObject,Query} from 'parse';

export interface LoadOptions {
  limit?:number,
  skip?:number,
  include?:string[]
}

export class ParseSpr extends BaseSpr{
  private parseClass : any;
  private parseItems : ParseObject[];
  constructor(name:string,options:sprOptions){
    super(name,options);
    this.parseClass = ParseObject.extend(name);
  }
  saveMap(x:Object,px:ParseObject):ParseObject{
    Object.keys(x).map(key => px.set(key,x[key]));
    return px;
  }
  loadMap(px:ParseObject):any{
    return px.toJSON();
  }
  add(item:any):void{
    //let o = new ParseObject(this.getName());
    let o = new this.parseClass();
    this.saveMap(item,o).save().then(x => {item[this.getIndex()] = x.id; super.add(item);});
  }
  update(item:any):void{
    super.update(item);
    new Query(this.parseClass).equalTo('objectId',item[this.getIndex()]).find().then((results:ParseObject[]) =>{
      results.map(x=>this.saveMap(item,x).save());
    });
  }
  remove(item):void{
    new Query(this.parseClass).equalTo('objectId',item[this.getIndex()]).find().then((results:ParseObject[]) =>
      results.map(x=>x.destroy()));
    super.remove(item)
  }
  clear():void{
    new Query(this.parseClass).find().then((results:ParseObject[]) => results.map(x=>x.destroy()));
    super.clear()
  };
  load(options:LoadOptions):void{
    let q = new Query(this.parseClass);
    if (options.include) options.include.map( i => q.include(i));
    if (options.limit) q.limit(options.limit);
    if (options.skip) q.skip(options.skip);
    q.find().then((results:ParseObject[]) => {
      let items = results.map(x=>this.loadMap(x));
      this.add(items);
    });
  }
  loadAll():void{
    new Query(this.parseClass).find().then((results:ParseObject[]) => {
      super.clear();
      let items = results.map(x=>this.loadMap(x));
      this.add(items);
    })
  }
}
