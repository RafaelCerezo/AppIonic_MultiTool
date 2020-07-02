import { Component } from '@angular/core';
import { UserData } from '../user-data';
import { Router } from '@angular/router'
import { AuthServiceService } from '../services/auth-service.service'

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

  constructor(private router: Router, private authService: AuthServiceService) {}

   async onSubmit(){
    const user = await this.authService.login(this.user);
    if(!user){
      console.log('Error al logear con el usuario');
    }else{
      //this.router.navigateByUrl('/barra-tabs');
    }
  }

}
