import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AmbientePage } from './ambiente';

@NgModule({
  declarations: [
    AmbientePage,
  ],
  imports: [
    IonicPageModule.forChild(AmbientePage),
  ],
})
export class AmbientePageModule {}
