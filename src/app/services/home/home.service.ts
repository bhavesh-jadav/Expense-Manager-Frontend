import { environment } from './../../../environments/environment';
import { AuthService } from './../auth/auth.service';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HomeService {

  options: any;

  constructor(private http: Http) {}

  addUser(user) {
    return this.http.post(
      environment.baseApiUrl + 'api/v1/register',
      user
    );
  }
}
