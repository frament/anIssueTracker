import {BaseSpr, sprOptions} from "./base-spr";

export class ParseSpr extends BaseSpr{
  constructor(name:string,options:sprOptions){
    super(name,options);
  }
  add():void{super.add();}
  update():void{super.update()}
  remove():void{super.remove()}
  get():void{super.get()};
  clear():void{super.clear()};
  sunc():void{}
  load():void{}
  loadAll():void{}
}
