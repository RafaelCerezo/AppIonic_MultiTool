import { Component } from '@angular/core';
import { AuthServiceService } from '../usersAuthentication/services/auth-service.service'
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private auth: AuthServiceService, private menu: MenuController) {}

  openMenu(){
    this.menu.open('menuOptions');
  }

  
  async logOut(){
    this.auth.logout();
  }

  async openNavigator(){
    
  }

}
