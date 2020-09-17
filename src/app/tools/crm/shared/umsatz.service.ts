import { Injectable } from '@angular/core';
// import { Http, URLSearchParams, Headers,Response,RequestOptions} from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable }  from 'rxjs';
import { LoginparameterService } from '../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable()
export class UmsatzService {
  chartdata:Array<number> = [];
  loginparameter:any;

  datumvon: string;
  datumbis: string;

  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
  this.loginparameter = this.loginparameterService.getparameter();
  let tempdatum = new Date().getFullYear() -1;
  this.datumvon = "01.01." + tempdatum;
  let tempbis = new Date().getFullYear() +1;
  this.datumbis = "31.12." + tempbis;

  console.log("datum werte",this.datumvon,this.datumbis);

  }


  public showall (kunde) {

     var umsatz = {
                kunde: kunde, vermittler: '*', vertreter: '*',
                key1: '*',
                key2: '*',
                key3: '*',
                key4: '*',
                key5: '*',
                r_key1: '1',
                r_key2: '1',
                r_key3: '1',
                r_key4: '1',
                r_key5: '1',
                r_key6: '1',
                r_key7: '1',
                r_key8: '1',
                r_key9: '1',
                r_kunde: '1',
                r_vertreter: '1',
                r_vermittler: '1',
                _datumvon: this.datumvon,
                _datumbis: this.datumbis
            };
  
   let body = '{"request":{"filter":"restitumsatzmonat%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06sicht%05' + 'A' + '%06vondatum%05' + umsatz._datumvon + '%06bisdatum%05' + umsatz._datumbis + '%06s-kunde%05' + umsatz.kunde + '%06s-vermittler%05' + umsatz.vermittler + '%06s-vertreter' + 
        '%05' + umsatz.vertreter +'%06s-key1%05' + umsatz.key1 + '%06s-key2%05' + umsatz.key2 + '%06s-key3%05' + umsatz.key3 + '%06s-key4%05' + umsatz.key4 + '%06s-key5' +
        '%05' + umsatz.key5 + '%06r-kunde%05' + umsatz.r_kunde + '%06r-vermittler%05' + umsatz.r_vermittler + '%06r-vertreter%05' + umsatz.r_vertreter + '%06r-key1%05' + umsatz.r_key1 + '%06r-key2' +
        '%05' + umsatz.r_key2 + '%06r-key3%05' + umsatz.r_key3 + '%06r-key4%05' + umsatz.r_key4 + '%06r-key5%05' + umsatz.r_key5 + '%06kunde%05%06firma%05' + this.loginparameter.loginfirma + '%06start%050%06anzahl%051000"}}';

    /*let jsondata = 'Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06sicht%05' + 'A' + '%06vondatum%05' + umsatz._datumvon + '%06bisdatum%05' + umsatz._datumbis + '%06s-kunde%05' + umsatz.kunde + '%06s-vermittler%05' + umsatz.vermittler + '%06s-objekt' +
        '%05' + umsatz.objekt + '%06s-vertreter%05' + umsatz.vertreter + '%06s-key1%05' + umsatz.key1 + '%06s-key2%05' + umsatz.key2 + '%06s-key3%05' + umsatz.key3 + '%06s-key4%05' + umsatz.key4 + '%06s-key5' +
        '%05' + umsatz.key5 + '%06r-kunde%05' + umsatz.r_kunde + '%06r-vermittler%05' + umsatz.r_vermittler + '%06r-objekt%05' + umsatz.r_objekt + '%06r-vertreter%05' + umsatz.r_vertreter + '%06r-key1%05' + umsatz.r_key1 + '%06r-key2' +
        '%05' + umsatz.r_key2 + '%06r-key3%05' + umsatz.r_key3 + '%06r-key4%05' + umsatz.r_key4 + '%06r-key5%05' + umsatz.r_key5 + '%06kunde%05%06firma%05' + this.loginparameter.loginfirma + '%06start%050%06anzahl%051000';
        
    let jsonbase64 = this.loginparameterService.stringtobase64(jsondata);
     //let body = '{"request":{"filter":"restitumsatzmonat%04'+jsonbase64+'"}}';*/  

    const headers = new HttpHeaders().set( "content-type", "application/json" );
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_itumsatzmonat));
  }
  
  showUmsatzCrm(umsatz) {
    //   console.log("umsatz", umsatz);
      let body = '{"request":{"filter":"restitumsatzmonat%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06sicht%05' + umsatz.sicht + '%06vondatum%05' + umsatz._datumvon + '%06bisdatum%05' + umsatz._datumbis + '%06s-kunde%05' + umsatz.kunde + '%06s-vermittler%05' + umsatz.vermittler + '%06s-objekt' +
        '%05' + umsatz.objekt + '%06s-vertreter%05' + umsatz.vertreter + '%06s-key1%05' + umsatz.key1 + '%06s-key2%05' + umsatz.key2 + '%06s-key3%05' + umsatz.key3 + '%06s-key4%05' + umsatz.key4 + '%06s-key5' +
        '%05' + umsatz.key5 + '%06r-kunde%05' + umsatz.r_kunde + '%06r-vermittler%05' + umsatz.r_vermittler + '%06r-objekt%05' + umsatz.r_objekt + '%06r-vertreter%05' + umsatz.r_vertreter + '%06r-key1%05' + umsatz.r_key1 + '%06r-key2' +
        '%05' + umsatz.r_key2 + '%06r-key3%05' + umsatz.r_key3 + '%06r-key4%05' + umsatz.r_key4 + '%06r-key5%05' + umsatz.r_key5 + '%06kunde%05%06firma%05' + this.loginparameter.loginfirma + '%06start%050%06anzahl%051000"}}'

    const headers = new HttpHeaders().set( "content-type", "application/json" );
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_itumsatzmonat));
  }
  
//   private extractData(res:Response){
//      let resultJson = res.json();
//      let result = resultJson.REST[0].messageResponse;
//      let resultJson2 = JSON.parse(result);
//      let result2 = resultJson2.tt_itumsatzmonat;
//      //console.log("umsatzdiagram",result2);
//      return result2;

//   }
}

