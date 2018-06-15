import { AmbientesProvider } from '../../providers/ambientes/ambientes';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Platform} from 'ionic-angular';
import { RelatorioPage } from '../relatorio/relatorio';



@Component({
  selector: 'page-ambientes',
  templateUrl: 'ambientes.html',
})
export class AmbientesPage {
  ambientes: Observable<any>;

  constructor(
    
    public navCtrl: NavController,
    private provider: AmbientesProvider,
    private alertCtrl: AlertController,
    public platform: Platform) {

    this.ambientes = this.provider.getAll();
  }

  irParaCadastro() {
    this.navCtrl.push('CadambientePage');
  }

  paraAmbiente(ambiente: any) {
    this.navCtrl.push('CadambientePage', { ambiente: ambiente });
  }

  presentModal(ambiente: any){
    this.navCtrl.push(RelatorioPage, {ambiente: ambiente});
  }


  removeAmbiente(key: string) {
    if (key) {
      this.provider.remove(key)
      .then(() => {
        this.alertCtrl.create({ title: 'Exclusão', message: 'Ambiente Removido. ', buttons: ['OK'] }).present();
        
      })
      .catch(() => {
        this.alertCtrl.create({ title: 'Erro', message: 'Erro ao remover ambiente.', buttons: ['OK']}).present();
        
      });
    }   
  }
}
