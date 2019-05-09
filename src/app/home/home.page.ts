import { FirebaseService } from './../services/firebase.service';
import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as moment from 'moment'
import { environment } from 'src/environments/environment.prod';
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public title = "Home Manager";
  private fireStoreInstance: AngularFirestoreCollection;
  public runState;
  public runStateResponse;
  private runResponseCount = 0;

  public constructor(public firestore: AngularFirestore, public fireservice: FirebaseService) {
    fireservice.runResponse().subscribe(change => {
      console.log('TM value change', change);
      this.runStateResponse = change.isRunning;
      if (this.runResponseCount <= 0) {
        this.runState = change.isRunning;
      }
      this.runResponseCount++;
    });
  }

  toggleHomeSyncState() {
    console.log('Action - toggleHomeSyncState');
    if (this.runResponseCount > 1) {
      this.fireservice.runRequest(this.runState);
    }
  }
}
