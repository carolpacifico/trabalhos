import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SigninPage } from '../signin/signin';

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  slides = [
    {
      title: "Salus",
      description: "<p> Com o celular na mão, você pode gerenciar suas medicações e as suas consultas médicas tudo em um só lugar!</p>",
      image: "assets/imgs/slide1.svg",
      color: "#ffebeb"
    },
    {
      title: "O <strong>Salus</strong> te auxilia em emergências!",
      description: "Saiba prestar primeiros socorros e veja quais são os hospitais mais próximos de você",
      image: "assets/imgs/slide2.svg",
    },
    {
      title: "Salus",
      description: "<p> Com o celular na mão, você pode gerenciar suas medicações e as suas consultas médicas tudo em um só lugar!</p>",
      image: "assets/imgs/slide3.svg",
    }
  ];

  irParaLoginPage() {
    this.navCtrl.push(SigninPage);
  }

}
