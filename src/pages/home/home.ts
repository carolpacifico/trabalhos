import { Component } from '@angular/core';
import { NavController, ActionSheetController, Platform } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { SigninPage } from '../signin/signin';
import { Observable } from 'rxjs/Observable';
import { RelatorioPage } from '../relatorio/relatorio';

import { AmbientesPage } from '../ambientes/ambientes';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  alertCtrl: any;
  ambientes: Observable<any>;

  constructor(
    public navCtrl: NavController, 
    private authService: AuthServiceProvider,
    private angularFireAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    public platform: Platform,
    private actionSheetCtrl: ActionSheetController) {  

      this.ambientes = this.getAllAmbientes();
  }
  signOut () {
    this.authService.signOut()
    .then(() => {
      this.navCtrl.setRoot(SigninPage);
    })
    .catch((error) => {
      console.error(error);
    });
  }

    openMenu() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opções',
      buttons: [
        {
          text: 'Sair',
          icon: !this.platform.is('ios') ? 'exit' : null,
          handler: () => {
            this.signOut()
          }
        },
    
        {
          text: 'Cancelar',
          role: 'Cancelar', 
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  presentModalAmbiente(ambiente: any){
    this.navCtrl.push(RelatorioPage, {ambiente: AmbientesPage});
  }


  mostrarMaisAmbientes(){
    this.navCtrl.push(AmbientesPage);
  }


  cadastrarAmbiente(){
    this.navCtrl.push('CadambientePage');
  }
  
  getAllAmbientes() {
    return this.db.list(this.angularFireAuth.auth.currentUser.uid + '/ambientes', ref => ref.orderByChild('date').limitToFirst(3))
    .snapshotChanges()
    .map(changes => {
      return changes.map(c => ({key: c.payload.key,...c.payload.val() }) );
    });
  }

  showPlatform() {
    let text = 'I run on: ' + this.platform.platforms();
    let alert = this.alertCtrl.create({
      title: 'My Home',
      subTitle: text,
      buttons: ['Ok']
    });
    alert.present();
  }
}