import { User } from './../model/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private currentUser: User = null;

  constructor(public firebaseAuth: AngularFireAuth) {
    var me = this;
    this.firebaseAuth.auth.setPersistence("local").then(rs => {
    }).catch(err => {
      console.log("Error setting auth persistance: ", err);
    });

    this.firebaseAuth.auth.onAuthStateChanged(function (user) {
      if (user) {
        me.currentUser = new User(user.uid, user.email, user.photoURL, user.displayName, user.refreshToken, user.metadata.lastSignInTime);
      }
    });
  }

  // getUser(): User {
  //   return this.currentUser;
  // }

  authenticateUser(email: string, password: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
      await this.firebaseAuth.auth.signInWithEmailAndPassword(email, password).then(result => {
        const user = new User(result.user.uid, result.user.email, result.user.photoURL,
          result.user.displayName, result.user.refreshToken, result.user.metadata.lastSignInTime);
        this.isAuthenticated = true;
        resolve(user);
      }).catch(error => {
        reject(error);
      })
    })
  }

  isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  isUserStillValid(): boolean {
    console.log("User Current: ", this.currentUser);
    if (this.currentUser == null) {
      return false;
    } else {
      this.isAuthenticated = true;
      return true;
    }
  }
}
