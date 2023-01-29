import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async show(message: string) {
    try {
      const toast = await this.toastController.create({
        message: message,
        duration: 1500,
        position: 'bottom'
      });
  
      await toast.present();
    } catch(err) {
      console.warn(err)
    }
  }
}
