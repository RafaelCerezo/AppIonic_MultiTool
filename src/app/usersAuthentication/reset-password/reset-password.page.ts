import { Component} from '@angular/core';
import { Location } from '@angular/common';
import { AuthServiceService } from '../services/auth-service.service'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {

  public email: string;

  constructor(private location: Location, private authService: AuthServiceService) { }

  async recoverPassword(){
    const resultado = this.authService.sendRecoverPasswordEmail(this.email);
    if(resultado){
      this.location.back();
    }
  }
}
