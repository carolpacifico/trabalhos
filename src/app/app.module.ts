import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RecaptchaModule } from 'ng-recaptcha';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { AmbientesPage } from '../pages/ambientes/ambientes';


import { SobrePage } from '../pages/sobre/sobre';
import { IntroPage } from '../pages/intro/intro';

import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AmbientesProvider } from '../providers/ambientes/ambientes';
import { Vibration } from '@ionic-native/vibration';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { RelatorioPage } from '../pages/relatorio/relatorio';

const firebaseConfig = {
  apiKey: "AIzaSyCHysI-h6Suuk5kVI2rMwYCdeF1g0GnLBI",
  authDomain: "phytoanalise-a3a09.firebaseapp.com",
  databaseURL: "https://phytoanalise-a3a09.firebaseio.com",
  projectId: "phytoanalise-a3a09",
  storageBucket: "phytoanalise-a3a09.appspot.com",
  messagingSenderId: "294905168577"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,
    ResetpasswordPage,
    AmbientesPage,
    IntroPage,
    SobrePage,
    RelatorioPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RecaptchaModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,
    ResetpasswordPage,
    AmbientesPage,
    IntroPage,
    SobrePage,
    RelatorioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    AmbientesProvider,
    Vibration,
    LocalNotifications
  ]
})
export class AppModule {}
