import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AmbientesProvider {
  private PATH = '/ambientes';

  constructor(private db: AngularFireDatabase, public angularFireAuth: AngularFireAuth) {  }


  getAll() {
    return this.db.list(this.angularFireAuth.auth.currentUser.uid + this.PATH, ref => ref.orderByChild('date'))
    .snapshotChanges()
    .map(changes => {
      return changes.map(c => ({key: c.payload.key,...c.payload.val() }) );
    });
  }

  get(key:string) {
    return this.db.object(this.PATH + key)
    .snapshotChanges()
    .map(c => {
      return { key: c.key,...c.payload.val()};
    });
  }

  save(ambiente: any) {
    return new Promise((resolve, reject) => {
      if(ambiente.key) {
        this.db.list(this.angularFireAuth.auth.currentUser.uid + this.PATH)
        .update(ambiente.key, {
          nome: ambiente.nome,  
          largura: ambiente.largura, 
          comprimento: ambiente.comprimento,
          profundidade: ambiente.profundidade
        })
        .then(() => resolve())
        .catch((e) => reject(e));
      } else {
        this.db.list(this.angularFireAuth.auth.currentUser.uid + this.PATH)
        .push({
          nome: ambiente.nome, 
          largura: ambiente.largura, 
          comprimento: ambiente.comprimento,
          profundidade: ambiente.profundidade})
        .then(() => resolve());
      }
    })
  }

  remove(key:string) {
    return this.db.list(this.angularFireAuth.auth.currentUser.uid + this.PATH).remove(key);
  }
}
