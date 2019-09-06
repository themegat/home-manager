import { LocalPeristenceService } from './local-peristence.service';
import { User } from './../model/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { CustomError } from '../model/custom-error.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private currentUser: User = null;
  public observableUser: BehaviorSubject<User>;

  constructor(
    public firebaseAuth: AngularFireAuth,
    private localPersist: LocalPeristenceService,
    public httpClient: HttpClient) {
    this.observableUser = new BehaviorSubject<User>(this.currentUser);
    var me = this;
    this.firebaseAuth.auth.setPersistence("local").then(rs => {
    }).catch(error => {
      console.log(AuthService.name, error);
    });

    this.firebaseAuth.auth.onAuthStateChanged(function (user) {
      if (user) {
        me.getUserToken().then(token => {
          me.currentUser = new User(user.uid, user.email, user.photoURL, user.displayName, token, user.refreshToken, user.metadata.lastSignInTime);
          me.fireUserChange();
        })
      }
    });
  }

  fireUserChange() {
    this.observableUser.next(this.currentUser);
  }

  getUser(): Promise<User> {
    return new Promise((resolve, reject) => {
      if (this.currentUser != null) {
        resolve(this.currentUser);
      }
    })
  }

  getUserToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.auth.currentUser.getIdToken(true).then(token => {
        resolve(token);
      }).catch(error => {
        reject(error);
        console.log(AuthService.name, error);
      })
    });
  }

  refreshUserToken(): Promise<any> {
    var headers: HttpHeaders = new HttpHeaders();
    headers.set("Content-Type", "application/x-www-form-urlencoded");
    var url: string = `${environment.firebase.auth.refreshTokenEndpoint}?key=${environment.firebase.auth.apiKey}`;

    return new Promise((resolve, reject) => {
      this.localPersist.get(LocalPeristenceService.KEY.USER_REFRESH_TOKEN).then(storedRefreshToken => {
        var payload: any = {
          grant_type: "refresh_token",
          refresh_token: storedRefreshToken
        };

        this.httpClient.post(url, payload, { headers: headers }).subscribe(response => {
          this.currentUser.token = response["access_token"];
          this.currentUser.refreshToken = response["refresh_token"];
          resolve(this.currentUser);
        }, error => {
          console.log(AuthService.name, error, storedRefreshToken);
          reject({
            origin: AuthService.name,
            error: error
          });
        })
      }).catch(error => {
        console.log(new CustomError(AuthService.name, error, ""));
      });
    })
  }

  authenticateUser(email: string, password: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
      await this.firebaseAuth.auth.signInWithEmailAndPassword(email, password).then(result => {
        this.getUserToken().then(token => {
          this.localPersist.set(LocalPeristenceService.KEY.USER_REFRESH_TOKEN, result.user.refreshToken);
          const user = new User(result.user.uid, result.user.email, result.user.photoURL,
            result.user.displayName, token, result.user.refreshToken, result.user.metadata.lastSignInTime);
          this.isAuthenticated = true;
          resolve(user);
        })
      }).catch(error => {
        reject(error);
      })
    })
  }

  signOut() {
    this.localPersist.remove(LocalPeristenceService.KEY.USER_REFRESH_TOKEN);
    this.firebaseAuth.auth.signOut();
  }

  isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  isUserStillValid(): boolean {
    if (this.currentUser == null) {
      return false;
    } else {
      this.isAuthenticated = true;
      return true;
    }
  }
}
