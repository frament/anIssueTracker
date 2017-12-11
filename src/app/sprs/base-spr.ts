import {LocalStore} from "../classes/localstorage";
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
  private localStore:any;
  private options:sprOptions;
  constructor(name:string,options?:sprOptions){
    this.name = name;
    this.options = { storeLocal:true, index : 'id'};
    Object.keys(options).map(key => this.options[key] = options[key]);
    if (this.options.storeLocal) {
      this.localStore = new LocalStore(name);
      if (this.hasSavedLocal()) this.getSavedLocal();
    }
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
  saveAllLocal():void{
    this.localStore.clear().then(
      this.items.map(item => this.localStore.setItem(item[this.options.index],item))
    )
  }
  getSavedLocal():void{
    this.localStore.getAll(this.name).then(items => {
      this.items = items;
      this._items.next(items);
    })
  }
  hasSavedLocal():boolean{
    return this.localStore.hasInstance(this.name);
  }
  clearSavedLocal():void{}
  asObservable():Observable<any[]>{
    return this.observer;
  }
  //todo сделать обработку не полной перезаписи а перезаписи отдельных значений
  private defaultAfterTriger():void{
    this._items.next(this.items);
    if(this.options.storeLocal) this.saveAllLocal();
  }
}
