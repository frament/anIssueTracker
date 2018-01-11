import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {IssueServise} from "../servises/Issue.servise";
import {Issue} from "../classes/Issue";
import {Comment} from "../classes/Comment";
import {LoadOptions} from "../sprs/parse-spr";

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
  private _selectedIssue: Issue;
  private _comments: Comment[] = [];
  //private issues: Issue[];

  constructor(private _issueServise: IssueServise, private route: ActivatedRoute,) {
    const code = this.route.snapshot.paramMap.get('code');
    this._issueServise.clearOnlyLocal();
    _issueServise.load({equal: [{Field: 'Code', Value: code}]});

  }

  ngOnInit() {
    //this.getIssueWithComments();
    this.getIssueWithComments();
  }

  getIssueWithComments(){
    this._issueServise.asObservable().subscribe(
      issues => {
        if (issues.length > 0)
        {
          this._selectedIssue = issues[0];
          this._issueServise.getComments(this._selectedIssue.objectId).then(resolve => (this._comments = resolve));
        }
      }
    );
  }
}
