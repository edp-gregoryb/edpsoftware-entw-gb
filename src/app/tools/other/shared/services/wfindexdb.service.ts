import { Injectable } from '@angular/core';
import {Wftable} from '../rest-services/wfload.service';
import Dexie from 'dexie';
import { DexieService } from '../../../../core/DexieService';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {LoginparameterService} from '../../../shared/services/loginparameter.service';

export interface Wf {
  objekt: String;
  obj_bezeichnung: String;
  untertitel: String;
  aschlussel: String;
  ausgbez: String;
  fortschritt: String;
}

export interface WfWtihID extends Wf {
  id: number;
}


@Injectable({
  providedIn: 'root'
})
export class WfindexdbService {

  loginparameter: any;
  table: Dexie.Table<WfWtihID, number>;

  constructor(private dexieService: DexieService, private loginparameterService: LoginparameterService,
              private http: HttpClient) {
    this.loginparameter = this.loginparameterService.getparameter();
    this.table = this.dexieService.table('wf');
    console.log('table erstellt', this.table);

  }

  deletedb() {
        Dexie.delete('WfHelpTable');
    }

  getAll() {
    return this.table.toArray();
  }

  add(data) {
    return this.table.add(data);
  }

  update(id, data) {
    return this.table.update(id, data);
  }

  updateUntertitel(aschlusselIN, objektIN, untertitelIN) {
      this.table.where('aschlussel').equals(aschlusselIN).and(o => o.objekt === objektIN)
          .modify({untertitel: untertitelIN});
  }

  removeProduct(aschlusselIN, objektIN) {
      this.table.where('aschlussel').equals(aschlusselIN).and(o => o.objekt === objektIN)
          .delete();
  }

  remove(id) {
    return this.table.delete(id);
  }

  //Erstes mal Tablelle abfüllen
  public postObj(stat) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders().set("content-type", "application/json");
      let body = '{"request":{"filter":"restvlobjabfrage%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' +
          this.loginparameter.loginsprache + '%06stat%05' + stat  +  '%06objekt%05%06suche%05%06firma%05' + this.loginparameter.loginfirma + '%06"}}';

      this.http.post(this.loginparameter.loginurl, body, {headers})
          .pipe(map((res: Response) => res['REST'][0].messageResponse))
          .pipe(map(res => JSON.parse(res)))
          .pipe(map(res => res.tt_vlobjabfrage))
          .pipe(map(res => {
            // this.clearRows();
            for (let ro of res) {
              //console.log('ro', ro);
              Promise.resolve().then((value => {
                this.getProdukt(ro.objekt, ro.obj_bezeichnung, ro.untertitel)
              }))
            }
          })).toPromise();
    })
  }

    public postObjOne(obj, stat) {
        return new Promise((resolve, reject) => {
            const headers = new HttpHeaders().set("content-type", "application/json");
            let body = '{"request":{"filter":"restvlobjabfrage%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' +
                this.loginparameter.loginsprache + '%06stat%05' + stat  + '%06objekt%05' + obj + '%06suche%05%06firma%05' +
                this.loginparameter.loginfirma + '%06"}}';

            this.http.post(this.loginparameter.loginurl, body, {headers})
                .pipe(map((res: Response) => res['REST'][0].messageResponse))
                .pipe(map(res => JSON.parse(res)))
                .pipe(map(res => res.tt_vlobjabfrage))
                .pipe(map(res => {
                    // this.clearRows();

                        //console.log('ro', ro);
                        Promise.resolve().then((value => {
                            this.getProdukt(res[0].objekt, res[0].obj_bezeichnung, res[0].untertitel)
                        }))

                })).toPromise();
        })
    }

  getProdukt(obj, objbez, untertitel) {
    return  new Promise((resolve, reject) => {
      const headers = new HttpHeaders().set("content-type", "application/json");
      let body = '{"request":{"filter":"restvlgetprodukt%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' +
          this.loginparameter.loginsprache + '%06objekt%05' + obj + '%06aschlussel%05%06firma%05' + this.loginparameter.loginfirma + '%06"}}}';

      this.http.post(this.loginparameter.loginurl, body, {headers})
          .pipe(map((res: Response) => res['REST'][0].messageResponse))
          .pipe(map(res => JSON.parse(res)))
          .pipe(map(res => res.tt_vlprodukt))
          .pipe(map(res => {
                if (res.length >= 1) {
                  console.log('getProdukt wfindexdb', res[0].objekt, res[0].aschlussel,  objbez,  untertitel);
                  this.add({objekt: res[0].objekt, aschlussel: res[0].aschlussel, obj_bezeichnung: objbez, untertitel: untertitel});

                  this.getProdArtikel(res[0].objekt, res[0].aschlussel);
                  this.getvlAschlussel(res[0].objekt, res[0].aschlussel);


                  resolve(res);
                }
              })
          ).toPromise();
    })
  }

  getProdArtikel(obj, aschlussel) {
    return  new Promise((resolve, reject) => {
      const headers = new HttpHeaders().set("content-type", "application/json");
      let body = '{"request":{"filter":"restvlgetprodartikel%04Termid%05' + this.loginparameter.logintermid +
          '%06sprache%05' + this.loginparameter.loginsprache + '%06objekt%05' + obj + '%06aschlussel%05' + aschlussel +
          '%06objektartikel%05%06firma%05' + this.loginparameter.loginfirma + '%06"}}';

      this.http.post(this.loginparameter.loginurl, body, {headers})
          .pipe(map((res: Response) => res['REST'][0].messageResponse))
          .pipe(map(res => JSON.parse(res)))
          .pipe(map(res => res.tt_vlprodartikel))
          .pipe(map(res => {
                console.log('tt_vlprodartikel', res);
                if (res.length >= 1) {
                  this.getvlProdArtAufgabe(res[0].objekt, res[0].aschlussel, res[0].objektartikel);
                  this.getFortschritt(res);
                  //this.updateRenderTableUntertitel(res[0].aschlussel, res[0].objekt, res[0].untertitel);

                }
              })
          ).toPromise();
    })
  }

  getvlProdArtAufgabe(obj, aschlussel, objartikel) {
    return  new Promise((resolve, reject) => {
      const headers = new HttpHeaders().set("content-type", "application/json");
      let body = '{"request":{"filter":"restvlgetprodartikelaufgabe%04Termid%05' + this.loginparameter.logintermid +
          '%06sprache%05' + this.loginparameter.loginsprache + '%06objekt%05' + obj + '%06aschlussel%05' + aschlussel +
          '%06objektartikel%05' + objartikel + '%06aufgabeid%050%06firma%05' + this.loginparameter.loginfirma + '%06"}}';

      this.http.post(this.loginparameter.loginurl, body, {headers})
          .pipe(map((res: Response) => res['REST'][0].messageResponse))
          .pipe(map(res => JSON.parse(res)))
          .pipe(map(res => res))
          .pipe(map(res => {
            //   console.log('getvlProdArtAufgabe', res)
            resolve(res);
          })).toPromise();
    })
  }

  getFortschritt( artikel) {
    this.getProgress(0, artikel, 0, 0, 0);

  }

    refreshProgress(obj, aschlussel) {
        this.getProdArtikel(obj, aschlussel);
    }

  getProgress(j, allArtikel, p, counter, done) {
    return  new Promise((resolve, reject) => {
      const headers = new HttpHeaders().set("content-type", "application/json");

      let body = '{"request":{"filter":"restvlgetprodartikelaufgabe%04Termid%05' + this.loginparameter.logintermid +
          '%06sprache%05' + this.loginparameter.loginsprache +  '%06objekt%05' + allArtikel[p].objekt +
          '%06aschlussel%05' + allArtikel[p].aschlussel + '%06objektartikel%05' + allArtikel[p].objektartikel + '%06aufgabeid%050' +
          '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';

      this.http.post(this.loginparameter.loginurl, body, {headers})
          .pipe(map((res: Response) => res['REST'][0].messageResponse))
          .pipe(map(res => JSON.parse(res)))
          .pipe(map(res => res.tt_vlprodartikelaufgabe))
          .pipe(map(allAufgaben => {
            //  console.log('restvlgetprodartikelaufgabe', allAufgaben)

            for (let i = 0; i < allAufgaben.length; i++) {
              counter++;
              if (allAufgaben[i].erledigt === true) {
                done++;
              }
            }

            if (counter !== 0) {
              // console.log('done/counter', done + ',' + counter);
              // this.updateRenderTableFortschritt(allArtikel[p].aschlussel, allArtikel[p].objekt, (done / counter) * 100);

              this.table.where('aschlussel').equals(allArtikel[p].aschlussel).and(o => o.objekt === allArtikel[p].objekt)
                  .modify({fortschritt: ((done / counter) * 100)});

            } else {
              // console.log('done/counter', '0');
              // this.updateRenderTableFortschritt(allArtikel[p].aschlussel, allArtikel[p].objekt,'0');
              this.table.where('aschlussel').equals(allArtikel[p].aschlussel).and(o => o.objekt === allArtikel[p].objekt)
                  .modify({fortschritt: '0'});
            }

            if (p < allArtikel.length - 1) {
              this.getProgress(j, allArtikel, p + 1, counter, done);
            }

          })).toPromise();
    })
  }

  getvlAschlussel(obj, aschlussel) {
    return  new Promise((resolve, reject) => {
      const headers = new HttpHeaders().set("content-type", "application/json");

      let body = '{"request":{"filter":"restvlgetaschlussel%04Termid%05' + this.loginparameter.logintermid +
          '%06sprache%05' + this.loginparameter.loginsprache + '%06objekt%05' + obj + '%06aschlussel%05' + aschlussel +
          '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';

      this.http.post(this.loginparameter.loginurl, body, {headers})
          .pipe(map((res: Response) => res['REST'][0].messageResponse))
          .pipe(map(res => JSON.parse(res)))
          .pipe(map(res => res.tt_vlgetaschlussel))
          .pipe(map(res => {
            console.log('tt_vlgetaschlussel', res)
           this.table.where('aschlussel').equals(res[0].aschlussel).and(o => o.objekt === res[0].objekt).modify({ausgbez: res[0].ausgbez});
          })).toPromise();

    })
  }


}
