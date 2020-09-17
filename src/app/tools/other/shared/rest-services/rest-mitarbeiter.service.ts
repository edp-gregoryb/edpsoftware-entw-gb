import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from '../../../shared/services/loginparameter.service';
import { map, filter } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RestMitarbeiterService {

  loginparameter:any
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }
  
  getMitarbeiter(mitbeznr, sicht) {
    //filtert alle mitarbeiter nach mitbeznr um ein spezifischen mitarbeiter zu finden
    return this.getAllMitarbeiter(sicht)
              .pipe(map(arr => {
                return arr.filter(value => {
                  if(value.mitbeznr === mitbeznr){
                    return true;
                  }
                  return false;
                });
              }));
  }
  
  getAllMitarbeiter(sicht) {
    let body = '{"request":{"filter":"restitgetmitarbeiter%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + 
                '%06sicht%05' + sicht + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    
    return this.http.post(this.loginparameter.loginurl, body, { headers })
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => JSON.parse(res)))
      .pipe(map(res => res.tt_itgetmitarbeiter));
  }
}
