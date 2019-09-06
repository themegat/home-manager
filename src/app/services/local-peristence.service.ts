import { CustomError } from './../model/custom-error.model';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'

@Injectable({
  providedIn: 'root'
})

export class LocalPeristenceService {

  constructor(private storage: Storage) {}


  public set(key: string, value: string) {
    this.storage.set(key, value);
  }

  public get(key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.storage.get(key).then(value => {
        if(value == null){
          reject(new CustomError(LocalPeristenceService.name, value, "Value not found"))
        }
        resolve(value);
      }).then(error => {
        reject(new CustomError(LocalPeristenceService.name, error, ""))
      })
    })
  }

  public remove(key: string) {
    this.storage.remove(key)
  }
}

export namespace LocalPeristenceService {
  export enum KEY {
    USER_REFRESH_TOKEN = "USER_REFRESH_TOKEN"
  }
}