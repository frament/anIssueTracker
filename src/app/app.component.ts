import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  currentPath:string;
  showSide:boolean = false;
  constructor(private location: Location,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.currentPath = this.location.path();
    this.showSide = this.currentPath.indexOf("/auth") !== 0;
    this.router.navigate(["auth"], {
      relativeTo: this.route,
      queryParams: {
        returnedTo: this.currentPath.indexOf("/auth") === 0 ? "/" : this.currentPath
      }
    });
  }

}
