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
  loading = null;

  constructor(public auth: AuthService, public router: Router, public loadingCntrl: LoadingController,
    public toastCtrl: ToastController) { }

  ngOnInit() { }

  login(form: NgForm) {
    this.isLoading = true;
    this.presentLoading();
    this.auth.authenticateUser(form.value.email, form.value.password).then(user => {
      console.log("TM user login: ", user);
      this.isLoading = false;
      this.dismissLoading();
      this.router.navigate(['home']);
    }).catch(error => {
      this.dismissLoading();
      this.isLoading = false;
      this.presentToast(error.message ? error.message : "Could not login");
      console.log("Login error: ", error);
    });
  }

  dismissLoading() {
    this.loading.dismiss();
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
      duration: 5000
    });
    toast.present();
  }
}
