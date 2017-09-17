import { Router } from '@angular/router';
import { error } from 'util';
import { AuthService } from '../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    'email': new FormControl(),
    'password': new FormControl()
  });

  credentials: any;
  logInSuccess = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.logOut();
  }

  login() {
    this.credentials = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };

    this.authService.logIn(this.credentials).subscribe(
      response => {
        if (response) {
          this.logInSuccess = true;
          this.router.navigate(['/user/dashboard']);
        } else {
          this.logInSuccess = false;
        }
      },
      error => {
        this.logInSuccess = false;
      }
    );
  }
}
