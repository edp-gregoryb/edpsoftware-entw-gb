import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class IndexdbService {

  private db: any;
  constructor() { }

  deletedb() {
    Dexie.delete('MyDatabase');
  }
  async clearRows() {
    await this.db.wf.clear().then(result => console.log(result));
  }
}
