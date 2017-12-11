import * as localforage from 'localforage';

export class LocalStore {
  private instances = {};

  getItem(key:string)
  getItem(key:string,instance?:string):Promise<any> {
    return instance && this.instances[instance] ? this.instances[instance].getItem(key):localforage.getItem(key);
  }

  setItem(key:string,value:any)
  setItem(key:string,value:any,instance?:string){
    return instance && this.instances[instance] ? this.instances[instance].setItem(key,value):localforage.getItem(key,value);
  }

  removeItem(key:string)
  removeItem(key:string,instance?:string):Promise<any> {
    return instance && this.instances[instance] ? this.instances[instance].removeItem(key):localforage.removeItem(key);
  }

  clear()
  clear(instance?:string):Promise<void>{
    return instance && this.instances[instance] ? this.instances[instance].clear():localforage.clear();
  }

  hasInstance(instance:string){
    return !!this.instances[instance];
  }

  async getAll()
  async getAll(instance?:string):Promise<any>{
    let _inst = instance && this.instances[instance] ? this.instances[instance] : localforage;
    _inst.keys().then(keys => {
      return Promise.all(keys.map(key => _inst.getItem(key)));
    });
  }

  init(instance:string):void{
    this.instances[instance] = localforage.createInstance({
      name: instance
    });
  }

  constructor(instance?:string){
    localforage.config({
      driver      : localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
      name        : instance ? instance:'anIssueTracker',
      version     : 1.0,
      size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
      storeName   : 'keyvaluepairs', // Should be alphanumeric, with underscores.
      description : 'anIssueTracker database'
    });
  }
}
