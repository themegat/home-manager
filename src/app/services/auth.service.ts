import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  constructor(public firebaseAuth: AngularFireAuth) { }

  authenticateUser(email: string, password: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
      await this.firebaseAuth.auth.signInWithEmailAndPassword(email, password).then(result => {
        const user = new User(result.user.uid, result.user.email, result.user.photoURL, result.user.displayName);
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
}
