import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(public afAuth: AngularFireAuth, public toastController: ToastController, private storage: Storage) { }
}
