import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  isCollapsed = true;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logOut() {
    if (this.authService.isLoggedIn()) {
      this.authService.logOut();
    }
    this.router.navigate(['index']);
  }

}
