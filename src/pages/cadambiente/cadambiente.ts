import { AmbientesProvider } from '../../providers/ambientes/ambientes';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';
import { AmbientesPage } from '../ambientes/ambientes';

@IonicPage()
@Component({
  selector: 'page-cadambiente',
  templateUrl: 'cadambiente.html',
})
export class CadambientePage {
  title: string;
  form: FormGroup;
  ambiente: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private provider: AmbientesProvider,
    private alertCtrl: AlertController,
    private vibration: Vibration) {

      this.ambiente = this.navParams.data.ambiente || { };
      this.createForm();

      this.setupPageTitle();
  }

  private setupPageTitle() {
    this.title = this.navParams.data.ambiente ? 'Editar Ambiente' : 'Novo Ambiente';
  }  

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.ambiente.key],
      nome: [this.ambiente.nome, Validators.required],
      comprimento: [this.ambiente.comprimento, Validators.required],
      largura: [this.ambiente.largura],
      profundidade: [this.ambiente.profundidade, Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value)
        .then(() => {
          this.alertCtrl.create({ title: 'Sucesso', message: 'Ambiente salvo!', buttons: ['OK']}).present();
          this.navCtrl.pop();
          this.navCtrl.push(AmbientesPage);
        })
        .catch((e) => {
          this.alertCtrl.create({ title: 'Erro', message: 'Erro ao salvar!',  buttons: ['OK']}).present();
        })
    }
  }
}