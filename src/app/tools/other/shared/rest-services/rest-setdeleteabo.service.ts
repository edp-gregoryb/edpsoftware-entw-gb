import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { LoginparameterService } from './../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RestSetdeleteaboService {

  loginparameter:any;
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  datePat = /(\d{4}\-\d{2}\-)(\d{2})(T)(\d{2})(:00:00\.000Z)/;

  createEmptyAbo(_beznr: number): Observable<any> {
    let body = '{"request":{"filter":"restcreateAbo%04' +
                'Termid%05' + this.loginparameter.logintermid + 
                '%06sprache%05' + this.loginparameter.loginsprache + 
                '%06beznr%05' + _beznr + 
                '%06firma%05' + this.loginparameter.loginfirma + '"}}';
    
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    
    return this.http.post(this.loginparameter.loginurl, body, { headers })
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => res.replace(/\\u000a/g, '')))
      .pipe(map(res => JSON.parse(res).tt_abo[0]));
  }

  saveAbo(mutCode: string, abodetails: any): Observable<any> {
    //mutCode: Mutationscode -> N = Neu, M = Mutation, L = Loeschen
    abodetails.mutationscode = mutCode;

    //falsche daten korrigieren
    // ! Dies funktioniert nur bei allen Zeitzonen UTC+
    // ! Bei zeitzonene UTC- (also GB, Portugal, Amerika,...) wuerde immer ein tag in der zukunft abgespeichert werden
    this.iterate(abodetails);

    let stringjson = JSON.stringify({"tt_abo":[abodetails]});
    let stringjsonBase64 = btoa(encodeURIComponent(stringjson).replace(/%([0-9A-F]{2})/g, (match, p1) => { return String.fromCharCode(("0x" + p1) as any); }));

    let body = '{"request":{"filter":"restupdateAbo%04' +
                'Termid%05' + this.loginparameter.logintermid + 
                '%06Abo%05' + stringjsonBase64 + 
                '%06sprache%05' + this.loginparameter.loginsprache + 
                '%06firma%05' + this.loginparameter.loginfirma + '"}}';
    
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    
    return this.http.post(this.loginparameter.loginurl, body, { headers })
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => res.replace(/\\u000a/g, '')))
      .pipe(map(res => JSON.parse(res).tt_abo[0]));
  }

  deleteAbo(abodetails: any): Observable<any> {
    return this.saveAbo("L", abodetails);
  }

  //iteriert durch alle properties eines verschachtelten objektes und ersetzt falsche daten
  iterate(obj): void {
    Object.keys(obj).forEach(key => {
      if(obj[key] !== null && (obj[key].toString()).match(this.datePat)) {
        obj[key] = (obj[key]).replace(this.datePat, regexReplacer);
      }
      if (obj[key] !== null && typeof obj[key] === 'object') {
        this.iterate(obj[key]);
      }
    });
  }
}

function regexReplacer(match, p1, p2, p3, p4, p5): string {
  let newDate = (Number(p2)+1).toString();
  if(newDate.length === 1) {
    newDate = '0'.concat(newDate);
  }
  return (p1 + newDate + p3 + '00' + p5);
}
