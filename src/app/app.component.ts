import { Router } from '@angular/router';
import { User } from './model/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  currentUser: User = new User("", "", "", "", "", "");
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private menuCtrl: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initializeUser();
    });
  }

  initializeUser() {
    var me = this;
    this.firebaseAuth.auth.onAuthStateChanged(function (user) {
      if (user) {
        me.currentUser = new User(user.uid, user.email, user.photoURL, user.displayName, user.refreshToken, user.metadata.lastSignInTime);
      }
    });
  }

  signOut() {
    console.log("Sigining out");
    this.firebaseAuth.auth.signOut();
    this.menuCtrl.close();
    this.router.navigate(['login']);
  }
}
