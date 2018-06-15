import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { User } from '../../providers/auth-service/user';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { ResetpasswordPage } from '../resetpassword/resetpassword';


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',  
 //template: '<re-captcha (onResolve)="resolved($event)" siteKey="6LdcG14UAAAAANO5HpgpbbJ7n3EH0p6QlVL70lsw"></re-captcha>',
})
export class SigninPage {

  private captchaPassed: boolean = false;
  private captchaResponse: string;
  
  
  user: User = new User();
  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController, 
    private toastCtrl: ToastController,
    private authService: AuthServiceProvider,
    private zone: NgZone) {
  }

  captchaResolved(resolve: string): void {
    this.zone.run(()=>  {
      this.captchaPassed = true;
      this.captchaResponse = resolve;
    });
  }

  createAccount() {
    this.navCtrl.push(SignupPage);
  }

  resetPassword() {
    this.navCtrl.push(ResetpasswordPage);
  }

  signIn() {
    if((this.form.form.valid)&&(grecaptcha.getResponse())) {
      this.authService.signIn(this.user)
      .then(() => {
        this.navCtrl.setRoot(HomePage);
      })
      
      .catch((error: any) => {
        let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom'});
        if(error.code == 'auth/invalid-email') {
          toast.setMessage('O e-mail informado é inválido!');
        } else if(error.code == 'auth/user-disabled') {
          toast.setMessage('O usuário está desativado!');
        } else if(error.code == 'auth/user-not-found') {
          toast.setMessage('O usuário não foi encontrado!');
        } else if(error.code == 'auth/wrong-password') {
          toast.setMessage('Senha ou usuário incorreto!');
        }
        toast.present();
      });
    }
  }
}
