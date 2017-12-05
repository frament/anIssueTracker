import {Localstorage} from "../classes/localstorage";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
export interface sprOptions{
  storeLocal?:boolean;
  index?:string;
}
export interface getOptions{
  ids?:any[];
  id?:string|number;
  field?:string;
  value?:any|any[];
  object?:Object;
}
export class BaseSpr {
  private items:any[];
  private _items: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private observer: Observable<any[]> = this._items.asObservable();
  private storeLocal:boolean;
  private name:string;
  private localStore:any = new Localstorage();
  private options:sprOptions;
  constructor(name:string,options?:sprOptions){
    this.options = options;
    if(!this.options.index) this.options.index = 'id';
    if(this.options.storeLocal && this.hasSavedLocal()) this.getSavedLocal();
  }
  add(item:any):void{
    if (!item[this.options.index]) item[this.options.index] = this.items.length;
    this.items.push(item);
    this.defaultAfterTriger();
  }
  update(item:any):void{
    this.items[this._getItemArrIndexById(item[this.options.index])] = item;
    this.defaultAfterTriger();
  }
  remove(item:any):void{
    this.items.splice(this._getItemArrIndexById(item[this.options.index]),1);
    this.defaultAfterTriger();
  }
  getFirst(query:getOptions):any{
   return this.get(query)[0] || null;
  }
  get(query:getOptions):any[]{
    return this._get(query).slice();
  }
  private _getItemArrIndexById(id:string|number){
    let idx = this.items
      .map((x:any,i:number)=>{return {id:x[this.options.index],idx:i}})
      .filter(x=> x.id == id)[0];
    return idx ? idx.idx : -1;
  }
  private _get(query:getOptions):any[]{
    if (!query){
      return this.items;
    }else if (query.id){
      return this.items.filter(x => x[this.options.index] == query.id);
    }else if(query.ids && query.ids.length > 0){
      return this.items.filter(x => query.ids.indexOf(x[this.options.index])!= -1);
    }else if(query.field && query.value){
      if (query.value instanceof Date){
        return this.items.filter(x=> x[query.field].getTime() == query.value.getTime());
      }else if (Array.isArray(query.value)){
        return this.items.filter(x => query.value.indexOf(x[query.field])!= -1);
      }else if (query.value instanceof Object){
        return this.items.filter(x => {
          //todo сделать более детальную проверку для подобъектов
          for(let key in query.value) if (x[key]!=query.value[key]) return false;
          return true;
        })
      }else{
        return this.items.filter(x => x[query.field] == query.value);
      }
    }else if(query.object){

    }
    return [];
  }
  clear():void{
    this.items = [];
    if(this.options.storeLocal) this.clearSavedLocal();
    this.defaultAfterTriger();
  }
  saveLocal():void{}
  getSavedLocal():void{}
  hasSavedLocal():void{}
  clearSavedLocal():void{}
  asObservable():Observable<any[]>{
    return this.observer;
  }
  private defaultAfterTriger():void{
    this._items.next(this.items);
    if(this.options.storeLocal) this.saveLocal();
  }
}
