import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from './../../../environments/environment';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  logIn(credentials) {
    return this.http.post(
      environment.baseApiUrl + 'api/v1/login',
      credentials
    ).map( response => {
        if (response.status === 400) {
          return false;
        } else {
          const result = response.json();
          if (result && result.token) {
            localStorage.setItem('token', result.token);
            return true;
          } else {
            return false;
          }
        }
      }
    );
  }

  getTokenFromLoclaStorage() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    if (this.getTokenFromLoclaStorage()) {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    if (this.getTokenFromLoclaStorage()) {
      localStorage.removeItem('token');
    }
  }

  getCurrentUser() {
    const token = this.getTokenFromLoclaStorage();
    if (token) {
      const jwtHelper = new JwtHelper();
      const userData = jwtHelper.decodeToken(token);
      return userData;
    }
  }

}
