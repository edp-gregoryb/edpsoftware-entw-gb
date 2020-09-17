import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {LoginparameterService} from '../../../shared/services/loginparameter.service';

@Injectable({
  providedIn: 'root'
})
export class UsedObjectService {

  loginparameter: any


  constructor(private http: HttpClient, private loginparameterService: LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }


  getUsedObjekt(stat) {
    let body = '{"request":{"filter":"restvlobjabfrage%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' +
        this.loginparameter.loginsprache + '%06stat%05' + stat  +  '%06objekt%05%06suche%05%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  }

  sendRequest(body) {
    const headers = new HttpHeaders().set("content-type", "application/json");

    return this.http.post(this.loginparameter.loginurl, body, {headers})
        .pipe(map((res: Response) => res['REST'][0].messageResponse))
        .pipe(map(res => JSON.parse(res)))
        .pipe(map(res => res.tt_vlobjabfrage));


  }

  getProduktAschlussel(obj) {
    const headers = new HttpHeaders().set("content-type", "application/json");
    let body = '{"request":{"filter":"restvlgetprodukt%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' +
        this.loginparameter.loginsprache + '%06objekt%05' + obj + '%06aschlussel%05%06firma%05' + this.loginparameter.loginfirma + '%06"}}}';

   return this.http.post(this.loginparameter.loginurl, body, {headers})
        .pipe(map((res: Response) => res['REST'][0].messageResponse))
        .pipe(map(res => JSON.parse(res)))
        .pipe(map(res => res.tt_vlprodukt))
        .pipe(map(res => {
          if (res.length >= 1) {
             // this.getProdArtikel(res[0].objekt, res[0].aschlussel)
            return res;
          }
        }))
  }

  getProdArtikel(obj, aschlussel) {
    const headers = new HttpHeaders().set("content-type", "application/json");
    let body = '{"request":{"filter":"restvlgetprodartikel%04Termid%05' + this.loginparameter.logintermid +
        '%06sprache%05' + this.loginparameter.loginsprache + '%06objekt%05' + obj + '%06aschlussel%05' + aschlussel +
        '%06objektartikel%05%06firma%05' + this.loginparameter.loginfirma + '%06"}}';

   return  this.http.post(this.loginparameter.loginurl, body, {headers})
        .pipe(map((res: Response) => res['REST'][0].messageResponse))
        .pipe(map(res => JSON.parse(res)))
        .pipe(map(res => res.tt_vlprodartikel))
        .pipe(map(res => {
          console.log('tt_vlprodartikel', res);
          if (res.length >= 1) {
              console.log('tt_vlprodartikel nach if', res);
              //this.getFortschritt(res);
              // for (let item of res) {
              //     console.log('item.objekt, item.aschlussel, item.objektartikel', item.objekt, item.aschlussel, item.objektartikel)
              //
              //    // this.getvlProdArtAufgabe(item.objekt, item.aschlussel, item.objektartikel);
              // }


          }
        }))
  }


  getvlProdArtAufgabe(obj, aschlussel, objartikel) {
      console.log('getvlProdArtAufgabe',obj, aschlussel, objartikel)
      const headers = new HttpHeaders().set("content-type", "application/json");
      let body = '{"request":{"filter":"restvlgetprodartikelaufgabe%04Termid%05' + this.loginparameter.logintermid +
          '%06sprache%05' + this.loginparameter.loginsprache + '%06objekt%05' + obj + '%06aschlussel%05' + aschlussel +
          '%06objektartikel%05' + objartikel + '%06aufgabeid%050%06firma%05' + this.loginparameter.loginfirma + '%06"}}';

     return  this.http.post(this.loginparameter.loginurl, body, {headers})
          .pipe(map((res: Response) => res['REST'][0].messageResponse))
          .pipe(map(res => JSON.parse(res)))
          .pipe(map(res => res))
          .pipe(map(res => {
            console.log('Prodartikel', res)


    }))
  }

    getFortschritt( artikel) {
        this.getProgress(0, artikel, 0, 0, 0);

    }

    getProgress(j, allArtikel, p, counter, done) {

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
                      console.log('restvlgetprodartikelaufgabe', allAufgaben)

                    // for (let i = 0; i < allAufgaben.length; i++) {
                    //     counter++;
                    //     if (allAufgaben[i].erledigt === true) {
                    //         done++;
                    //     }
                    // }
                    //
                    // if (counter !== 0) {
                    //     // console.log('done/counter', done + ',' + counter);
                    //     // this.updateRenderTableFortschritt(allArtikel[p].aschlussel, allArtikel[p].objekt, (done / counter) * 100);
                    //
                    //     this.table.where('aschlussel').equals(allArtikel[p].aschlussel).and(o => o.objekt === allArtikel[p].objekt)
                    //         .modify({fortschritt: ((done / counter) * 100)});
                    //
                    // } else {
                    //     // console.log('done/counter', '0');
                    //     // this.updateRenderTableFortschritt(allArtikel[p].aschlussel, allArtikel[p].objekt,'0');
                    //     this.table.where('aschlussel').equals(allArtikel[p].aschlussel).and(o => o.objekt === allArtikel[p].objekt)
                    //         .modify({fortschritt: '0'});
                    // }
                    //
                    // if (p < allArtikel.length - 1) {
                    //     this.getProgress(j, allArtikel, p + 1, counter, done);
                    // }
        }))
    }
}
