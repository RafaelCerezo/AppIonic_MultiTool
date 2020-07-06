import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { ToastController } from '@ionic/angular';
import { UserData } from '../user-data';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public isLogged: any = false;
  public userUid: string;

  constructor(public afAuth: AngularFireAuth, public toastController: ToastController, private router: Router) {
    //Checking if someone is already logged in
    this.afAuth.authState.subscribe(result=> this.isLogged = result );
    this.afAuth.onAuthStateChanged(user =>{
      if(user){
        this.userUid = user.uid;
        //console.log("user logged")
      }else{
        //console.log("no user")
        this.userUid = '';
        this.router.navigateByUrl('/login-register')
      }
    })
   }

   async login(user: UserData, rememberMe: boolean){
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
        if(rememberMe){
          await this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        }else{
          //We also have NONE option so the user log in information will never be saved which implies that
          //if he refresh the page, the login-register page will appear
          await this.afAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
        }
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


  async sendRecoverPasswordEmail(email: string){
    let message = '';
    let color = '';
    let resultado = true;

    try{
      await this.afAuth.sendPasswordResetEmail(email)
      message = 'Se ha enviado un email con los pasos necesarios para recuperar la contraseña.';
      color =  'success';
    }catch(error){
      console.log(error);
      message= "El email introducido no corresponde a ningún usuario registrado.";
      color= 'danger';
      resultado = false;
    }
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 2000
    });
    await toast.present();
    return resultado;
  }
}
