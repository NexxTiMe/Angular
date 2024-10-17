import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Token} from "../model/Token";
import moment, {Moment} from "moment/moment";
import {tap} from "rxjs";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  login(username: string, password: string) {
    return this.httpClient.post<Token>(environment.baseURL + environment.api.LOGIN_URL, { username, password }, {
      responseType: "json"
    })
      .pipe(tap(token => {
        if (token) {
          this.setSession(token)
        }
      }));
  }

  private setSession(token: Token) {
    const expiresAt: Moment = moment().clone().add(token.expiresIn, 'seconds');

    localStorage.setItem('accessToken', token.accessToken);
    localStorage.setItem('refreshToken', token.refreshToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    const expiration = this.getExpiration();
    if (!expiration) return false;
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    if (!expiration){
      return null;
    }
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  logoutAndRefresh() {
    this.logout();
    this.router.navigateByUrl('/login')
  }

}
