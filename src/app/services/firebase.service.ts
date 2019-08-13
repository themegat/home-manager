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
    return this.firestore.collection(this.firestorePaths.events.name)
      .doc(this.firestorePaths.path)
      .collection(this.firestorePaths.events.run.name).doc(this.firestorePaths.events.run.doc.status)
      .valueChanges();
  }

  public listenerResponse(): Observable<any> {
    return this.firestore.collection(this.firestorePaths.events.name)
      .doc(this.firestorePaths.path)
      .collection(this.firestorePaths.events.listener.name).doc(this.firestorePaths.events.listener.doc.doorPatio)
      .valueChanges();
  }

  public runRequest(isRunning: boolean) {
    this.firestore.collection(this.firestorePaths.events.name)
      .doc(this.firestorePaths.path)
      .collection(this.firestorePaths.events.run.name)
      .doc(this.firestorePaths.events.run.doc.action).set({
        isRunning: isRunning,
        lastUpdate: new Date().getTime(),
        message: ""
      })
  }
}
