import { CustomError } from './../../model/custom-error.model';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLoading: boolean = false;
  private loading = null;
  isPasswordVisible = false;
  password = "";

  constructor(public auth: AuthService, public router: Router, public loadingCntrl: LoadingController,
    public toastCtrl: ToastController) { }

  ngOnInit() {
    this.autoLogin();
  }

  autoLogin() {
    this.presentLoading();
    setTimeout(() => {
      this.dismissLoading();
      if (this.auth.isUserStillValid()) {
        this.router.navigate(['home']);
      } else {
        this.auth.refreshUserToken().then(rs => {
          console.log("TM RF OK: ", rs);
          this.router.navigate(['home']);
        }).catch(error => {
          console.log(new CustomError(LoginPage.name, error, ""));
        })
      }
    }, 3000);
  }

  login(form: NgForm) {
    this.isLoading = true;
    this.presentLoading();
    //Timeout to allow presentLoading() to assign value to this.loading
    setTimeout(() => {
      this.auth.authenticateUser(form.value.email, form.value.password).then(user => {
        console.log("TM user login: ", user);
        this.password = "";
        this.isLoading = false;
        this.dismissLoading();
        this.router.navigate(['home']);
      }).catch(error => {
        this.dismissLoading();
        this.isLoading = false;
        this.presentToast(error.message ? error.message : "Could not login");
        console.log("Login error: ", error);
      });
    }, 1000);
  }

  dismissLoading() {
    if (this.loading != null) {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCntrl.create({
      spinner: "crescent",
      showBackdrop: true,
      duration: 0,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'app-loading'
    });
    return await this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 5000,
      color: "primary"
    });
    toast.present();
  }

  togglePassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
