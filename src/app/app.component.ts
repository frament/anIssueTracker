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
  constructor(private location: Location,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    let currentPath = this.location.path();
    this.router.navigate(["auth"], {
      relativeTo: this.route,
      queryParams: {
        returnedTo: currentPath.indexOf("/auth") === 0 ? "/" : currentPath
      }
    });
  }
}
