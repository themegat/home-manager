import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private firestorePaths = environment.firebase;
  constructor(private firestore: AngularFirestore) { }

  public runResponse(): Observable<any> {
    return this.firestore.collection(this.firestorePaths.event.name)
      .doc(this.firestorePaths.path)
      .collection(this.firestorePaths.event.run).doc(this.firestorePaths.event.doc.status)
      .valueChanges();
  }

  public runRequest(isRunning: boolean) {
    this.firestore.collection(this.firestorePaths.event.name)
      .doc(this.firestorePaths.path)
      .collection(this.firestorePaths.event.run)
      .doc(this.firestorePaths.event.doc.action).set({
        isRunning: isRunning,
        lastUpdate: new Date().getTime(),
        message: ""
      })
  }
}
