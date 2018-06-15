import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AmbientesPage } from './ambientes';

@NgModule({
  declarations: [
    AmbientesPage,
  ],
  imports: [
    IonicPageModule.forChild(AmbientesPage),
  ],
  exports: [
    AmbientesPage
  ]
})
export class AmbientesPageModule {}
