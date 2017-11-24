import {Injectable} from "@angular/core";
let Parse = require("parse");
import {User} from "parse";

@Injectable()
export class ParseService{
  private appId:string = "naIssueTracker";
  private parseUrl:string = "http://localhost:1337/parse";
  TOKEN_NAME:string = "PARSE_TOKEN";

  constructor(){
    Parse.initialize(this.appId);
    Parse.serverURL = this.parseUrl;
  }

  async login(login:string,pass:string):Promise<User>{
    return await Parse.User.logIn(login,pass);
  }
  async setToken(sessionToken:string):Promise<User>{
    return await Parse.User.become(sessionToken)
  }
  async exit():Promise<User> {
    return await Parse.User.logOut();
  }
  currentUser():User{
    return Parse.User.current();
  }
}
