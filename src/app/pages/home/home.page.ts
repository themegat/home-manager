import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseService } from '../../services/firebase.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public title = "Home";
  public runState: boolean = false;
  public toogleRunState: boolean = false;
  private lockFiresoreRequests: boolean = false;
  stateListener = {
    patioDoor: {
      isOpen: false,
      lastUpdate: ""
    }
  }

  public constructor(public fireservice: FirebaseService,
    public firebaseAuth: AngularFireAuth
  ) {
    this.initListeners();
  }

  initListeners() {
    this.fireservice.runResponse().subscribe(change => {
      console.log('TM value change', change);
      this.runState = this.toogleRunState = change.isRunning;
      this.lockFiresoreRequests = true;
      setTimeout(() => {
        this.lockFiresoreRequests = false;
      }, 1000);
    });

    this.fireservice.listenerResponse().subscribe(change => {
      let lastUpdated: Date = new Date(change.lastUpdated);
      console.log(`TM listener value change change.\n isOpen: ${change.isOpen}, 
      lastUpdated: ${lastUpdated.toDateString()} ${lastUpdated.getHours()}:${lastUpdated.getMinutes()}`);
      this.stateListener.patioDoor.isOpen = change.isOpen;
      this.stateListener.patioDoor.lastUpdate = `${lastUpdated.toDateString()} ${lastUpdated.getHours()}:${lastUpdated.getMinutes()}`
    })
  }

  toggleHomeSyncState() {
    if (!this.lockFiresoreRequests) {
      this.fireservice.runRequest(this.toogleRunState);
    }
  }
}
