import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseService } from '../../services/firebase.service';
import { Component } from '@angular/core';
import { auth } from 'firebase/app';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public title = "Home";
  public runState: boolean = false;
  public runStateResponse;
  private runResponseCount = 0;
  stateListener = {
    isPatioDoorOpen: false
  }

  public constructor(public fireservice: FirebaseService, public firebaseAuth: AngularFireAuth) {
    fireservice.runResponse().subscribe(change => {
      console.log('TM value change', change);
      this.runStateResponse = change.isRunning;
      if (this.runResponseCount < 1) {
        this.runState = change.isRunning;
      }
      setTimeout(() => {
        this.runResponseCount++;
      }, 1000);
    });
    this.initListeners();
  }

  initListeners() {
    this.fireservice.listenerResponse().subscribe(change => {
      console.log('TM listener value change', change);
      this.stateListener.isPatioDoorOpen = change.isOpen;
    })
  }

  toggleHomeSyncState() {
    var isRunning = this.runState ? true : false;
    if (this.runResponseCount >= 1) {
      this.fireservice.runRequest(isRunning);
    }
  }
}
