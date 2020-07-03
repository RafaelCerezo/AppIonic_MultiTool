import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserData } from '../user-data';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public isLogged: any = false;
  public userUid: string;

  constructor(public afAuth: AngularFireAuth, public toastController: ToastController, private storage: Storage) {
    //Checking if someone is already logged in
    this.afAuth.authState.subscribe(result=> this.isLogged = result );
    this.afAuth.onAuthStateChanged(user =>{
      if(user){
        this.userUid = user.uid;
      }else{
        this.userUid = '';
      }
    })
   }

   async login(user: UserData){
     console.log("aaaa");
     try{
      const toast = await this.toastController.create({
        message: 'Aún no ha verificado su cuenta de correo electrónico. Haga click en este mensaje para enviar el email de verificación de nuevo.',
        color: 'warning'
      });
      toast.onclick = () => {
        this.sendVerificationEmail();
        toast.dismiss();
      }
      const userLogged = await this.afAuth.signInWithEmailAndPassword(user.email, user.password);
      if(userLogged.user.emailVerified){
        this.saveDataStorage(user.email, user.password);
        toast.dismiss();
        return userLogged;
      }
      else
      {
        toast.present();
      }
     }catch(err){
       console.log(err);
     }
   }

   async register(user: UserData){
    try{
      return await this.afAuth.createUserWithEmailAndPassword(user.email, user.password).then(()=>{
        this.sendVerificationEmail();
      });
    }catch(error){
      console.log('Error on login', error);
    }
   }

   async sendVerificationEmail(){
    (await this.afAuth.currentUser).sendEmailVerification();
    const toast = await this.toastController.create({
      message: 'Se ha enviado un email de verificación.',
      color: 'success',
      duration: 2000
    });
    toast.present();
   }

   saveDataStorage(userEmail: string, userPass: string){
    console.log(userEmail),
     this.storage.set('userEmail', userEmail);
     this.storage.set('userPassword', userPass);
  }
}
