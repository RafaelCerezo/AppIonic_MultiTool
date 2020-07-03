import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginRegisterPage } from './login-register.page';

const routes: Routes = [
  {
    path: '',
    component: LoginRegisterPage
  },
  {
    path: 'login',
    loadChildren: () => import("../login/login.module").then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import("../register/register.module").then( m => m.RegisterPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRegisterPageRoutingModule {}
