import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { User } from '../../providers/auth-service/user';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { LocalNotifications } from '@ionic-native/local-notifications';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  private captchaPassed: boolean = false;
  private captchaResponse: string;

  user: User = new User();
  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private authService: AuthServiceProvider,
    private localNotifications: LocalNotifications,
    private zone: NgZone) {
  }

  captchaResolved(resolve: string): void {
    this.zone.run(()=>  {
      this.captchaPassed = true;
      this.captchaResponse = resolve;
    });
  }

  createAccount() {
      let toast = this.toastCtrl.create({ duration: 3000, position: "bottom" });
      if((this.form.form.valid)&&(this.captchaPassed === true)) {
        
      this.authService.createUser(this.user)
      .then((user: any) => {
        toast.setMessage('Usuário criado com sucesso!');
        toast.present();

        this.navCtrl.setRoot(HomePage);
        this.enviaNotificacaoCadastro();
      })
      .catch((error: any) => {
        if (error.code == "auth/email-already-in-use") {
          toast.setMessage('O e-mail já está sendo usado!');
        } else if (error.code == "auth/invalid-email") {
          toast.setMessage('O e-mail informado é inválido!');
        } else if (error.code == "auth/operation-not-allowed") {
          toast.setMessage('A operação não é permitida!');
        } else if (error.code == "auth/weak-passord") {
          toast.setMessage('A senha é muito fraca!');
        }
        toast.present();
      });
    }
  }
  enviaNotificacaoCadastro() {
    this.localNotifications.schedule({
      id: 1,
      title: 'Bem Vindo!',
      text: 'Plânctonálise'
    });
  }
}
