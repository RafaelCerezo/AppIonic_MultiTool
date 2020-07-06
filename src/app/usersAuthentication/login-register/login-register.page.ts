import { Component } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service'
import { AuthServiceService } from '../services/auth-service.service'
import { UserData } from '../user-data';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.page.html',
  styleUrls: ['./login-register.page.scss'],
})
export class LoginRegisterPage  {

  constructor(private dataStorageService: DataStorageService, private authService: AuthServiceService, private router: Router,) {
    //this.checkStorage();
   
  }

   async checkStorage(){
    let emailStorage;
    let passwordStorage;
    await this.dataStorageService.getDataStorage('email').then(value => emailStorage = value);
    await this.dataStorageService.getDataStorage('password').then(value => passwordStorage = value);
    /*console.log('emailSt', emailStorage);
    console.log('passSt', passwordStorage);*/
    if(emailStorage != null && passwordStorage != null){
      let user: UserData = {
        email: emailStorage.toString(),
        password: passwordStorage.toString()
      }
      let result = this.authService.login(user, true)
      //console.log('res', result)
      if(!result){
        this.router.navigateByUrl('./login');
      }else{
        this.router.navigateByUrl('/home');
      }
    }
   }
}
