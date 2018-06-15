import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { AmbientesPage } from '../pages/ambientes/ambientes';
import { IntroPage } from '../pages/intro/intro';
import { SobrePage } from '../pages/sobre/sobre';
import { StatusBar } from '@ionic-native/status-bar';
import { SigninPage } from '../pages/signin/signin';


@Component({
  selector: 'myapp',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) public nav: Nav;
  rootPage: any;

  public paginas = [
    {titulo: 'Ambientes', componente: AmbientesPage, icone: 'assets/imgs/grafico.png'},
    {titulo: 'Sobre', componente: SobrePage, icone: 'assets/imgs/sobre.png'}
  ];

  constructor(platform: Platform, 
              afAuth: AngularFireAuth,
              public menuCtrl: MenuController,
              public statusBar: StatusBar) {
    const authObserver = afAuth.authState.subscribe(user => {
      if (user) {
        this.rootPage = HomePage;
        this.closeMenu();
        authObserver.unsubscribe();
      } else {
        this.rootPage = SigninPage;
        this.closeMenu();
        authObserver.unsubscribe();
        
      }
    });
    platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#b91a1a');
    }); 

  }

  irParaPagina(componente) {
    this.nav.push(componente);
  }


  closeMenu() {
    return this.menuCtrl.swipeEnable(false);
  }
}