import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { RouterModule, Routes } from '@angular/router';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DashboardComponent } from './dashboard/dashboard.component';
import { ParseService } from "./parse.service";
const appRoutes:Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo:'dashboard',pathMatch: 'full' },
  { path: '**', component: AuthComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      //{ enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [ParseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
