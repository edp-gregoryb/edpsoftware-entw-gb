import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from '../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RestObjektService {

  loginparameter:any
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }
  
  //sucht objekte
  objAbfrage(_suche){
    // return this.objAbfrageMitObjekt(_suche, '');
    return this.objAbfrageAlt(_suche, '');
  }
  
  //liefert ein bestimmtes objekt
  objAbfrageMitObjekt(_suche, _objekt){
    let body = '{"request":{"filter":"restvlobjabfrage%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06objekt%05' + _objekt +
        '%06suche%05' + _suche + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    const headers = new HttpHeaders().set( "content-type", "application/json" );

    return this.http.post(this.loginparameter.loginurl, body, { headers })
        .pipe(map((res:Response) => res['REST'][0].messageResponse))
        .pipe(map(res => JSON.parse(res)))
        .pipe(map(res => res.tt_vlobjabfrage));
  }

  objAbfrageAlt(_suche, _objekt){
    let body = '{"request":{"filter":"restvlaltobjabfrage%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06objekt%05' + _objekt +
        '%06suche%05' + _suche + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    const headers = new HttpHeaders().set( "content-type", "application/json" );

    return this.http.post(this.loginparameter.loginurl, body, { headers })
        .pipe(map((res:Response) => res['REST'][0].messageResponse))
        .pipe(map(res => JSON.parse(res)))
        .pipe(map(res => res.tt_vlobjabfrage));
  }

  objAbfrageMitObjektNeu(_suche, _objekt){
    let body = '{"request":{"filter":"restvlobjabfrageNeu%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06objekt%05' + _objekt +
        '%06suche%05' + _suche + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    const headers = new HttpHeaders().set( "content-type", "application/json" );

    return this.http.post(this.loginparameter.loginurl, body, { headers })
        .pipe(map((res: Response) => res['REST'][0].messageResponse))
        .pipe(map(res => JSON.parse(res)))
        .pipe(map(res => res.tt_vlobjabfrage));
  }
  
  //liefert alle ausgaben eines objektes
  allAschlusselAbfrage(_objekt){
    return this.aschlusselAbfrage(_objekt, '');
  }
  
  //liefert eine bestimmte ausgabe
  aschlusselAbfrage(_objekt, _aschlussel){
    let body = '{"request":{"filter":"restvlgetaschlussel%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + 
                '%06objekt%05' + _objekt + '%06aschlussel%05' + _aschlussel + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    
    return this.http.post(this.loginparameter.loginurl, body, { headers })
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => JSON.parse(res)))
      .pipe(map(res => res.tt_vlgetaschlussel));
  }
}
