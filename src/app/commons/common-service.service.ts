import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(public toastController: ToastController) { }

  async createToast(message: string, color: string, duration?: number, functionOnClick?: any, functionArgs?: string[]){
    const newToast = await this.toastController.create({
      message,
      color,
      duration
    });
     newToast.onclick = ()=> { functionOnClick.call(functionArgs); newToast.dismiss()}
     return newToast;
  }
}
