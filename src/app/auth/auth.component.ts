import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ParseService} from "../parse.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {
  constructor(private parse:ParseService,
              private route: ActivatedRoute,
              private router: Router) {}
  hidePass = true;
  waitingSessionCheck: boolean = true;

  /**
   * Проходит авторизацию в парсе
   * @param username - имя пользователя
   * @param password - пароль
   * @returns {Promise<void>}
   */
  async authorize(username: string, password: string) {
    try {
      let authInfo = await this.parse.login(username, password);
      let token = authInfo.getSessionToken();
      if (!token) return;
      if (sessionStorage != null) {
        sessionStorage.setItem(this.parse.TOKEN_NAME, token);
      }
      this.returned();
    } catch (err) {
      console.error(err);
    }
  }

  private ready() {
    this.waitingSessionCheck = false;
  }

  /**
   * 1. Берет информацию о сессии в LocalStorage
   * 2. Проверяет, является ли сессия "живой"
   * 3. Если сессии нет или она "все" - роутит на /auth
   * @returns {Promise<void>}
   */
  async ngOnInit() {
    if (sessionStorage == null) return this.ready();
    let sessionToken = sessionStorage.getItem(this.parse.TOKEN_NAME);
    if (!sessionToken) return this.ready();
    try {
      await this.parse.setToken(sessionToken);
      this.returned();
    } catch (err) {
      sessionStorage.removeItem(this.parse.TOKEN_NAME);
    }
    this.ready();
  }

  /**
   * Возращается к предыдущему роуту (если он был задан)
   */
  private returned() {
    let returnedRoute = this.route.snapshot.queryParams["returnedTo"] || "/";
    this.router.navigate([returnedRoute]);
  }
}
