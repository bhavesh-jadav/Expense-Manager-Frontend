import { Router } from '@angular/router';
import { error } from 'util';
import { AuthService } from '../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required])
  });

  credentials: any;
  logInFailed = false;
  logInButtonText = 'Login';
  logInButtonDisabled = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.logOut();
  }

  login() {
    if (this.loginForm.valid) {
      this.logInButtonText = 'Loging you in...';
      this.logInButtonDisabled = true;
      this.credentials = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value
      };

      this.authService.logIn(this.credentials).subscribe(
        response => {
          if (response) {
            this.logInFailed = false;
            this.router.navigate(['/user/dashboard']);
          } else {
            this.logInFailed = true;
          }
        },
        error => {
          this.logInFailed = true;
          this.logInButtonText = 'Login';
          this.logInButtonDisabled = false;
        }
      );
    }
  }
}
