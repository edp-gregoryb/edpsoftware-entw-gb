import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from '../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

import { Article } from '../entities/Article';

@Injectable({
  providedIn: 'root'
})
export class RestArtikelService {

  loginparameter:any
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }
  
  //fuegt artikel hinzu und dessen aufgaben mit fortschritt
  addArtikel(_article: Article) {
    let body = '{"request":{"filter":"restvladdprodartikel%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache +
                '%06objekt%05' + _article.objekt + '%06aschlussel%05' + _article.aschlussel + '%06objektartikel%05' + _article.objektartikel + '%06startdatum%05' + _article.startdatum + 
                '%06enddatum%05' + _article.enddatum + '%06artikelVerantwortlicher%05' + this.loginparameter.mitarbeiter + '%06prozessid%05' + _article.prozessid + 
                '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  }
  
  updateArtikel(_article: Article) {
    console.log("bei SErvice", _article);
    let body = '{"request":{"filter":"restvlupdtprodartikel%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache +
                '%06objekt%05' + _article.objekt + '%06aschlussel%05' + _article.aschlussel + '%06objektartikel%05' + _article.objektartikel + '%06startdatum%05' + _article.startdatum + 
                '%06enddatum%05' + _article.enddatum + '%06artikelVerantwortlicher%05' + this.loginparameter.mitarbeiter +
              '%06titel%05' + _article.titel + '%06untertitel%05' + _article.untertitel + '%06autoren%05' + _article.autoren + '%06seitenzahl%05' + _article.seitenzahl +
        '%06permalinkid%05' + _article.permalinkid + '%06doi-nummer%05' + _article.doi_nummer + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  }
  
  //loescht artikel und dessen fortschritt
  deleteArtikel(objekt: string, aschlussel: string, objektartikel: string) {
    let body = '{"request":{"filter":"restvldeleteprodartikel%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache +
                '%06objekt%05' + objekt + '%06aschlussel%05' + aschlussel + '%06objektartikel%05' + objektartikel + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  }
  
  //liefert alle artikel eines produktes
  getAllArtikel(objekt: string, aschlussel: string) {
    return this.getArtikel(objekt, aschlussel, '');
  }
  
  //liefert einen artikel
  getArtikel(objekt: string, aschlussel: string, objektartikel: string) {
    let body = '{"request":{"filter":"restvlgetprodartikel%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache +
                '%06objekt%05' + objekt + '%06aschlussel%05' + aschlussel + '%06objektartikel%05' + objektartikel + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  }
  
  //sendet http.post und liefert response
  sendRequest(body) {
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    
    return this.http.post(this.loginparameter.loginurl, body, { headers })
      .pipe(map((res: Response) => res['REST'][0].messageResponse))
      .pipe(map(res => JSON.parse(res)))
      .pipe(map(res => res.tt_vlprodartikel));
  }
}

