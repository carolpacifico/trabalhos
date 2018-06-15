import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AmbientesProvider } from '../../providers/ambientes/ambientes';
import { Vibration } from '@ionic-native/vibration';

@IonicPage()
@Component({
  selector: 'page-relatorio',
  templateUrl: 'relatorio.html',
})
export class RelatorioPage {

  key: any;
  ambiente: any;
  constructor(private provider: AmbientesProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public angularFireAuth: AngularFireAuth,
    private vibration: Vibration,
    private alertCtrl: AlertController,) {

    this.ambiente = this.navParams.data.ambiente || {};
  }

  paraAmbiente(ambiente: any) {
    this.navCtrl.push('CadambientePage', { ambiente: ambiente });
  }

  removeAmbiente(key: string) {
    if (key) {
      this.provider.remove(key)
      .then(() => {
        this.alertCtrl.create({ title: 'Exclusão', message: 'Ambiente removido.', buttons: ['OK'] }).present();
        this.vibration.vibrate(100);
        
      })
      .catch(() => {
        this.alertCtrl.create({ title: 'Erro', message: 'Erro ao remover Ambiente.', buttons: ['OK']}).present();
       
      });
    }
  }

  showConfirm(key) {
    this.alertCtrl.create({
      title: 'Exclusão',
      message: 'Você realmente deseja excluir?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            this.alertCtrl.create({ title: 'Exclusão', message: 'Exclusão cancelada.', buttons: ['OK']}).present();
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.removeAmbiente(key);
          }
        }
      ]
    }).present();
  }


}


