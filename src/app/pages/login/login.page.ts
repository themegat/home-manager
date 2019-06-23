import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLoading: boolean = false;

  constructor(public auth: AuthService, public router: Router) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    this.isLoading = true;
    this.auth.authenticateUser(form.value.email, form.value.password).then(user => {
      console.log("TM user login: ", user);
      this.isLoading = false;
      this.router.navigate(['home']);
    }).catch(error => {
      this.isLoading = false;
      console.log("Login error: ", error);
    });
  }
}
