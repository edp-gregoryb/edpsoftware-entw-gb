import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from '../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

import { Product } from '../entities/Product';

@Injectable({
  providedIn: 'root'
})
export class RestProduktService {

  loginparameter:any
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }
  
  //fuegt ein produkt hinzu
  addProdukt(_prod: Product) {
    let body = '{"request":{"filter":"restvladdprodukt%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache +
                '%06objekt%05' + _prod.objekt + '%06aschlussel%05' + _prod.aschlussel + '%06autoren%05' + (_prod.autoren.join(',')) + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  }
  
  //updated ein produkt
  updateProdukt(_prod: Product) {
    let body = '{"request":{"filter":"restvlupdtprodukt%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache +
                '%06objekt%05' + _prod.objekt + '%06aschlussel%05' + _prod.aschlussel + '%06autoren%05' + (_prod.autoren.join(',')) + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  }
  
  //loescht ein produkt, dessen artikel und deren fortschritt
  deleteProdukt(objekt: string, aschlussel: string) {
    let body = '{"request":{"filter":"restvldeleteprodukt%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache +
                '%06objekt%05' + objekt + '%06aschlussel%05' + aschlussel + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  }
  
  //liefert alle produkte eines objektes
  getAllProdukt(objekt: string) {
    return this.getProdukt(objekt, '');
  }
  
  //liefert ein spezifisches produkt
  getProdukt(objekt: string, aschlussel: string) {
    let body = '{"request":{"filter":"restvlgetprodukt%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache +
                '%06objekt%05' + objekt + '%06aschlussel%05' + aschlussel + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  }
  
  //sendet http.post und liefert response
  sendRequest(body) {
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    
    return this.http.post(this.loginparameter.loginurl, body, { headers })
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => JSON.parse(res)))
      .pipe(map(res => res.tt_vlprodukt));
  }
}
