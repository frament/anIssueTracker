import { Component, OnInit } from '@angular/core';
import {Issue} from "../classes/Issue";
import {IssueServise} from "../servises/Issue.servise";

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {
 issues: Issue[];
  constructor(private _issueServise: IssueServise) { }

  ngOnInit() {
    this.getIssues();
  }

  getIssues() {
    this._issueServise.asObservable().subscribe(
      issues =>
        this.issues = issues
    );
    console.log(this.issues);
  }
}
