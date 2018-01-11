///<reference path="issue/issue.component.ts"/>
///<reference path="issues/issues.component.ts"/>
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { RouterModule, Routes } from '@angular/router';
import {
  MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatSidenavModule, MatToolbarModule, MatListModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DashboardComponent } from './dashboard/dashboard.component';
import { ParseService } from "./parse.service";
import { SideComponent } from './side/side.component';
import { IssuesComponent } from './issues/issues.component';
import { IssueServise } from "./servises/Issue.servise";
import { IssueComponent } from './issue/issue.component';

const appRoutes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'issues', component: IssuesComponent },
  { path: 'issue/:code', component: IssueComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', component: AuthComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    SideComponent,
    IssuesComponent,
    IssueComponent
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      //{ enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [ParseService, IssueServise],
  bootstrap: [AppComponent]
})
export class AppModule { }
