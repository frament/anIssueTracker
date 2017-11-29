import {Localstorage} from "../classes/localstorage";
export interface sprOptions{
  storeLocal?:boolean,
}
export class BaseSpr {
  private items:any[];
  private storeLocal:boolean;
  private name:string;
  private localStore:any = new Localstorage();
  constructor(name:string,options?:sprOptions){}
  add():void{}
  update():void{}
  remove():void{}
  get():void{}
  clear():void{}
  saveLocal():void{}
  getSavedLocal():void{}
  hasSavedLocal():void{}
  clearSavedLocal():void{}
}
