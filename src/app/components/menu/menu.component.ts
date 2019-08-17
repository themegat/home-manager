import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { FirebaseAuth } from '@angular/fire';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  currentUser: User = new User("", "", "", "", "", "");

  constructor(private firebaseAuth: AngularFireAuth,
    private router: Router,
    private menuCtrl: MenuController) { }

  ngOnInit() { 
    this.initializeUser();
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
