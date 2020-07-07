import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { UserData } from '../user-data';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router'
import { CommonServiceService } from '../../commons/common-service.service'


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public isLogged: any = false;
  public userUid: string;

  constructor(public afAuth: AngularFireAuth, private router: Router, private commonService: CommonServiceService) {
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
      const toast = await this.commonService.createToast(
      'Aún no ha verificado su cuenta de correo electrónico. Haga click en este mensaje para enviar el email de verificación de nuevo.',
      'warning'
      );
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

   async logout(){
     try{
      firebase.firestore().clearPersistence();
      this.afAuth.signOut();
     }catch(err){
      console.log(err);
      const toast = await this.commonService.createToast(
       'Ha ocurrido un error al cerrar sesión. Puede reintentarlo haciendo click en este mensaje o puede ponerse en contacto con los administradores.',
       'danger',
       2000,
       this.logout()
      );
      toast.present();
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
    const toast = await this.commonService.createToast(
      'Se ha enviado un email de verificación.',
      'success'
    );
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
    const toast = await this.commonService.createToast(
      message,
      color,
      2000
    );
    toast.present();
    return resultado;
  }
}
