import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { AuthServiceService } from '../services/auth-service.service'
import { UserData } from '../user-data';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  public user: UserData={
    email: '',
    password: ''
  }

  constructor(private router: Router, private authService: AuthServiceService) { }

  async onSubmit(){
    const user = await this.authService.register(this.user);
  }

}
