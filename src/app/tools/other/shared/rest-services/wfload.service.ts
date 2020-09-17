import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginparameterService} from '../../../shared/services/loginparameter.service';
import {map} from 'rxjs/operators';
import Dexie from 'dexie';
import {consoleTestResultHandler} from 'tslint/lib/test';


export class Wftable {
    constructor(public objekt?: String, public obj_bezeichnung?: String, public untertitel?: String, public aschlussel?: String,
               public ausgbez?: String, public fortschritt?: String) {
    }
}


@Injectable({
  providedIn: 'root'
})
export class WfloadService {

    private db: any;
    loginparameter: any;

    newWf: Wftable = new Wftable("", "","", "","", "");
    rows: Wftable[] = [];
    cb1: any;



  constructor(private http: HttpClient, private loginparameterService: LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
      this.makeDatabase();
      this.connectToDatabase();
      // this.clearRows();
   }



  public postObj() {
          return new Promise((resolve, reject) => {
              const headers = new HttpHeaders().set("content-type", "application/json");
              let body = '{"request":{"filter":"restvlobjabfrage%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' +
                  this.loginparameter.loginsprache + '%06objekt%05%06suche%05%06firma%05' + this.loginparameter.loginfirma + '%06"}}';

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
                              this.readTable().then(function success(data) {
                                  resolve(data);
                              })
                          }))
                      }
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
                this.newWf.objekt = res[0].objekt;
                this.newWf.aschlussel = res[0].aschlussel;
                this.newWf.obj_bezeichnung = objbez;
                this.newWf.untertitel = untertitel;


                this.addRow(this.newWf);


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

   refreshProgress(obj, aschlussel) {
        this.getProdArtikel(obj, aschlussel);
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
                        this.updateRenderTableFortschritt(allArtikel[p].aschlussel, allArtikel[p].objekt, (done / counter) * 100);
                    } else {
                        // console.log('done/counter', '0');
                        this.updateRenderTableFortschritt(allArtikel[p].aschlussel, allArtikel[p].objekt,'0');
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

                   return  this.updateRenderTable(res[0].aschlussel, res[0].objekt, res[0].ausgbez);

                })).toPromise();

        })
        }

    postObjUpdate() {
        return new Promise((resolve, reject) => {
            const headers = new HttpHeaders().set("content-type", "application/json");
            let body = '{"request":{"filter":"restvlobjabfrage%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' +
                this.loginparameter.loginsprache + '%06objekt%05%06suche%05%06firma%05' + this.loginparameter.loginfirma + '%06"}}';

            this.http.post(this.loginparameter.loginurl, body, {headers})
                .pipe(map((res: Response) => res['REST'][0].messageResponse))
                .pipe(map(res => JSON.parse(res)))
                .pipe(map(res => res.tt_vlobjabfrage))
                .pipe(map(res => {
                    for (let ro of res) {
                        //console.log('ro', ro);
                        Promise.resolve().then((value => {
                            this.getProduktOhneSave(ro.objekt)
                            this.readTable().then(function success(data) {
                                resolve(data);
                            })
                        }))
                    }
                })).toPromise();
        })
    }

    getProduktOhneSave(obj) {
        return  new Promise((resolve, reject) => {
            const headers = new HttpHeaders().set("content-type", "application/json");
            let body = '{"request":{"filter":"restvlgetprodukt%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' +
                this.loginparameter.loginsprache + '%06objekt%05' + obj + '%06aschlussel%05%06firma%05' + this.loginparameter.loginfirma + '%06"}}}';

            this.http.post(this.loginparameter.loginurl, body, {headers})
                .pipe(map((res: Response) => res['REST'][0].messageResponse))
                .pipe(map(res => JSON.parse(res)))
                .pipe(map(res => res.tt_vlprodukt))
                .pipe(map(res => {
                    console.log('getProduktOhneSave', obj);
                        if (res.length >= 1) {

                            this.getProdArtikel(res[0].objekt, res[0].aschlussel);
                            this.getvlAschlussel(res[0].objekt, res[0].aschlussel);
                            // this.updateRenderTableUntertitel(res[0].aschlussel, res[0].objekt, res[0].untertitel);
                            resolve(res);
                        }
                    })
                ).toPromise();
        })
    }

    postObjOneSave(obj) {
        return new Promise((resolve, reject) => {
            const headers = new HttpHeaders().set("content-type", "application/json");
            let body = '{"request":{"filter":"restvlobjabfrage%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' +
                this.loginparameter.loginsprache + '%06objekt%05' + obj + '%06suche%05%06firma%05' + this.loginparameter.loginfirma + '%06"}}';

            this.http.post(this.loginparameter.loginurl, body, {headers})
                .pipe(map((res: Response) => res['REST'][0].messageResponse))
                .pipe(map(res => JSON.parse(res)))
                .pipe(map(res => res.tt_vlobjabfrage))
                .pipe(map(res => {
                    console.log('res', res);
                   // for (let ro of res) {
                   //      console.log('ro', ro);
                        Promise.resolve().then((value => {
                            this.getProduktOneSave(res[0].objekt, res[0].obj_bezeichnung, res[0].untertitel)
                            this.readTable().then(function success(data) {
                                resolve(data);
                            })
                        }))
                   // }
                })).toPromise();
        })
    }

    getProduktOneSave(obj, objbez, untertitel) {
        return  new Promise((resolve, reject) => {
            const headers = new HttpHeaders().set("content-type", "application/json");
            let body = '{"request":{"filter":"restvlgetprodukt%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' +
                this.loginparameter.loginsprache + '%06objekt%05' + obj + '%06aschlussel%05%06firma%05' + this.loginparameter.loginfirma + '%06"}}}';

            this.http.post(this.loginparameter.loginurl, body, {headers})
                .pipe(map((res: Response) => res['REST'][0].messageResponse))
                .pipe(map(res => JSON.parse(res)))
                .pipe(map(res => res.tt_vlprodukt))
                .pipe(map(res => {
                    console.log('getProduktOneSave', untertitel);
                        if (res.length >= 1) {

                            this.newWf.objekt = res[0].objekt;
                            this.newWf.aschlussel = res[0].aschlussel;
                            this.newWf.obj_bezeichnung = objbez;
                            this.newWf.untertitel = untertitel;


                            this.addRow(this.newWf);
                            this.getProdArtikel(res[0].objekt, res[0].aschlussel);
                            this.getvlAschlussel(res[0].objekt, res[0].aschlussel);
                            this.updateRenderTableUntertitel(res[0].aschlussel, res[0].objekt, res[0].untertitel);
                            resolve(res);
                        }
                    })
                ).toPromise();
        })
    }

    refreshPage() {
        this.postObjUpdate();
    }

        makeDatabase(): void {
        this.db = new Dexie('MyDatabase');
        this.db.version(1).stores({
            wf: '++id, objekt, obj_bezeichnung, untertitel, aschlussel, ausgbez, fortschritt'
        });
        this.loadRows();
    }

    connectToDatabase(): void {
        this.db.open().catch((error) => {
            console.log("Errod during connecting to database : " + error);
        });
    }

   async clearRows() {
       await this.db.wf.clear().then(result => console.log(result));
        //this.loadRows();
    }

    loadRows(): void {
        this.db.wf.toArray().then(p => this.rows = p);
    }

    updateRenderTableFortschritt(aschlusselIn, objektIn, fortschritt) {
        // console.log('aschlusselIn', aschlusselIn, objektIn, fortschritt);
        this.db.transaction('rw',  this.db.wf, async () => {
            // Make sure we have something in DB:
            await this.db.wf.where('aschlussel').equals(aschlusselIn).and(o => o.objekt === objektIn).modify({fortschritt: fortschritt});
            await this.loadRenderTable();
        }).catch(e => {
            console.error(e.stack || e);
        });
    }

    updateRenderTable(aschlusselIn, objektIn, ausgbez) {
            this.db.transaction('rw', this.db.wf, async () => {
                await this.db.wf.where('aschlussel').equals(aschlusselIn).and(o => o.objekt === objektIn).modify({ausgbez: ausgbez});
                await this.loadRenderTable();
            }).catch(e => {
                console.error(e.stack || e);
            });
    }

    updateRenderTableUntertitel(aschlusselIn, objektIn, untertitel) {
      console.log('updateRenderTableUntertitel', aschlusselIn, objektIn, untertitel);
        this.db.transaction('rw', this.db.wf, async () => {
            await this.db.wf.where('aschlussel').equals(aschlusselIn).and(o => o.objekt === objektIn).modify({untertitel: untertitel});
            await this.loadRenderTable();
        }).catch(e => {
            console.error(e.stack || e);
        });
    }

    addRow(wf: Wftable): void {
        console.log(wf);
        this.db.wf.add({
            objekt: wf.objekt,
            obj_bezeichnung: wf.obj_bezeichnung,
            untertitel: wf.untertitel,
            aschlussel: wf.aschlussel,
            ausgbez: wf.ausgbez,
            fortschritt: wf.fortschritt
        });

        this.loadRows();
        this.newWf = new Wftable("", "", "", "", "", "");
    }

    readTable() {
        return  new Promise((resolve, reject) => {
            let objects =  this.db.wf.toArray().then(p => this.rows = p);

            if (objects.length == 0) {
                console.log("No record exists in the database right now for Person table.");

            } else {
                console.log('objects', objects)
                resolve(objects);

            }
        })
    }
    async cb1Call() {
      if (this.cb1) {
          return  this.cb1;
      } else {
          console.log('keine Daten');
      }

    }

   async loadRenderTable() {
            let products = await this.db.transaction('r', this.db.wf, async () => {
                products = await this.db.wf
                    .where('objekt').startsWith('Z')
                    .sortBy('aschlussel');
                //console.log('products', products)
                if (products.length === 0) {
                    console.log('keine Daten')
                } else {
                    this.cb1 = await products;
                    this.cb1Call()
                    return products;
                }
            })
    }

    public updateUntertitel() {
        return new Promise((resolve, reject) => {
            const headers = new HttpHeaders().set("content-type", "application/json");
            let body = '{"request":{"filter":"restvlobjabfrage%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' +
                this.loginparameter.loginsprache + '%06objekt%05%06suche%05%06firma%05' + this.loginparameter.loginfirma + '%06"}}';

            this.http.post(this.loginparameter.loginurl, body, {headers})
                .pipe(map((res: Response) => res['REST'][0].messageResponse))
                .pipe(map(res => JSON.parse(res)))
                .pipe(map(res => res.tt_vlobjabfrage))
                .pipe(map(res => {
                    // this.clearRows();
                    for (let ro of res) {
                        console.log('ro', ro);
                        Promise.resolve().then((value => {
                            this.updateRenderTableUntertitel(ro.aschlussel, ro.objekt, ro.untertitel);
                            // this.readTable().then(function success(data) {
                            //     resolve(data);
                            // })
                            this.loadRenderTable();
                        }))
                    }
                })).toPromise();
        })
    }



}
