import { Injectable } from '@angular/core';
import * as Parse from "parse";

@Injectable()
export class AuthService {
  parse = Parse;
  currentUser:Parse.User;
  constructor() {
    this.parse.initialize("naIssueTracker");
    this.parse.serverURL = 'http://localhost:1337/parse';
  }

  auth(login:string,pass:string){

  }

}
