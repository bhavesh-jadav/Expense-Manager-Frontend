import { AuthService } from '../../services/auth/auth.service';
import { HomeService } from '../../services/home/home.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    'username': new FormControl('', Validators.required),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', Validators.required)
  });

  messageType: string;
  showMessage = false;
  message: string;
  disableRegisterButton = false;
  registerButtonText = 'Register';

  constructor(private homeService: HomeService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.logOut();
  }

  addUser() {
    if (this.registerForm.valid) {
      this.disableRegisterButton = true;
      this.registerButtonText = 'Registering...';
      const user = {
        user_name: this.userNameFormControl.value,
        password: this.passwordFormControl.value,
        email: this.emailFormControl.value
      };
      this.homeService.addUser(user).subscribe(
        response => {
          this.displayMessage('success', response.json().message);
        },
        error => {
          this.displayMessage('danger', error.json().message);
        }
      );
    }
  }

  displayMessage (type: string, message: string) {
    this.messageType = type;
    this.message = message;
    this.showMessage = true;
    this.registerButtonText = 'Register';
    this.disableRegisterButton = false;
    this.resetForm();
  }

  resetForm() {
    this.registerForm.reset();
    this.userNameFormControl.setErrors(null);
    this.emailFormControl.setErrors(null);
    this.passwordFormControl.setErrors(null);
  }

  get userNameFormControl(){
    return this.registerForm.get('username');
  }

  get emailFormControl(){
    return this.registerForm.get('email');
  }

  get passwordFormControl(){
    return this.registerForm.get('password');
  }

}
