import { Component } from '@angular/core';
import { UserData } from '../user-data';
import { Router } from '@angular/router'
import { AuthServiceService } from '../services/auth-service.service'
import { DataStorageService } from '../services/data-storage.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {

  public user: UserData= {
    email: '',
    password: ''
  }

  constructor(private router: Router, private authService: AuthServiceService, private dataStorageService: DataStorageService) {}

  rememberMe : boolean = true;

  async onSubmit(){
    const user = await this.authService.login(this.user, this.rememberMe);
    if(!user){
      console.log('Error al logear con el usuario');
    }else{
      /*this.dataStorageService.saveDataStorage('email', this.user.email);
      this.dataStorageService.saveDataStorage('password', this.user.password);*/
      this.router.navigateByUrl('/home');
    }
  }

}
