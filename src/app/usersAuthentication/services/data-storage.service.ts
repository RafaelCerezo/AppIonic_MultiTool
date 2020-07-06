import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  THIS SERVICE IS NOT BEING USED SINCE WITH FIREBASE PERSISTANCE IS ENOUGH TO REMEMBER THE USER LOGGED PREVIOUSLY
*/

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private storage: Storage) { }

  async saveDataStorage(key: string, value: any){
     await this.storage.set(key, value);
  }

  async getDataStorage(key:string){
    return await this.storage.get(key);
  }

  async removeDataStorage(key: string){
    await this.storage.remove(key);
  }

}
