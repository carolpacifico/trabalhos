import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {
  userEmail: string = '';
  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController, 
    private toastCtrl: ToastController,
    private authService: AuthServiceProvider) {
  }

  resetPassword() {
    if(this.form.form.valid) {

      let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom'});
      this.authService.resetPassword(this.userEmail)
      .then(() => {
        toast.setMessage('Redefinição de senha enviada para o e-mail!');
        toast.present();

        this.navCtrl.pop();
      })
      .catch((error: any) => {
        if(error.code == 'auth/invalid-email') {
          toast.setMessage('O e-mail digitado é inválido!');
        } else if (error.code == 'auth/user-not-found') {
          toast.setMessage('O usuário não foi encontrado!');
        }
        toast.present();
      });
    }
  }
}
