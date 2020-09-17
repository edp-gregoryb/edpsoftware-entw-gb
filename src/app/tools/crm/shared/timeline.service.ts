import { Injectable } from '@angular/core';
// import { Http, URLSearchParams, Headers,Response,RequestOptions} from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable }  from 'rxjs';
import { LoginparameterService } from '../../shared/services/loginparameter.service';
import { Timeline } from '../../shared/entities/timeline';
import { map } from "rxjs/operators";

@Injectable()
export class TimelineService {
loginparameter:any;
timelinesearchparameter:Timeline;
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
   }

  public showall (kunde:number,verknuepfung:string,obj:string,rubrik:string,urubrik:string){
    var mitarb = "";
    if (obj === undefined || obj === "" || obj === null){
        mitarb = this.loginparameter.mitarbeiter;
    } else {
        console.log("obj anwesend restitauftragueber");
    }

   let body = '{"request":{"filter":"restitauftragueber%04Termid%05'+this.loginparameter.logintermid+'%06sprache%05'+this.loginparameter.loginsprache+'%06sicht%05A%06start%051%06anzahl%0550%06firma%05'+this.loginparameter.loginfirma+''+
        '%06kunde%05'+kunde+'%06objekt%05'+obj+'%06rubrik%05'+rubrik+'%06aufart%0501%06aufnr%05'+
        '%06vermittler%05%06vertreter%05'+
        '%06vondatum%05%06bisdatum%05%06verknuepfung%05'+verknuepfung+'%06urubrik%05'+urubrik+'%06mitarb%05' +mitarb+'"}}'; // 25.09.2017/RPS
        // '%06vondatum%05%06bisdatum%05%06verknuepfung%05'+verknuepfung+'%06urubrik%05'+urubrik+'%06mitarb%05' +this.loginparameter.mitarbeiter + '"}}';
    
    let jsondata = 'Termid%05'+this.loginparameter.logintermid+'%06sprache%05'+this.loginparameter.loginsprache+'%06sicht%05A%06start%051%06anzahl%0550%06firma%05'+this.loginparameter.loginfirma+''+
        '%06kunde%05'+kunde+'%06objekt%05'+obj+'%06rubrik%05'+rubrik+'%06aufart%0501%06aufnr%05'+
        '%06vermittler%05%06vertreter%05'+
        '%06vondatum%05%06bisdatum%05%06verknuepfung%05'+verknuepfung+'%06urubrik%05'+urubrik+'%06mitarb%05' +mitarb;
    
    let jsonbase64 = this.loginparameterService.stringtobase64(jsondata);
     //let body = '{"request":{"filter":"restitauftragueber%04'+jsonbase64+'"}}';
    
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_itauftragueber));
  }
  
public showallwithoutparam (searchval){
  let searchdaten = searchval;
   let body = '{"request":{"filter":"restitauftragueber%04Termid%05'+this.loginparameter.logintermid+'%06sprache%05'+this.loginparameter.loginsprache+'%06sicht%05'+searchdaten.sicht+'%06start%051%06anzahl%0550%06firma%05'+this.loginparameter.loginfirma+''+
        '%06kunde%05'+searchdaten.kunde+'%06objekt%05%06rubrik%05%06aufart%0501%06aufnr%05'+
        '%06vermittler%05%06vertreter%05'+
        '%06vondatum%05%06bisdatum%05%06verknuepfung%05%06objekt%05%06rubrik%05%06urubrik%05%06mitarb%05' +this.loginparameter.mitarbeiter + '"}}';

    const headers = new HttpHeaders().set( "content-type", "application/json" );
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_itauftragueber));
  }
  //kunde:string, aufart:string, aufnr:string, objekt:string, vondatum:string, bisdatum:string, rubrik:string, vermittler:string, vertreter:string, verknuepfung:string
  public showallwitparam (val){
      console.log(val);
      this.timelinesearchparameter = val;
    
   let body = '{"request":{"filter":"restitauftragueber%04Termid%05'+this.loginparameter.logintermid+'%06sprache%05'+this.loginparameter.loginsprache+'%06sicht%05'+this.timelinesearchparameter.sicht+'%06start%051%06anzahl%0550%06firma%05'+this.loginparameter.loginfirma+''+
        '%06kunde%05'+this.timelinesearchparameter.kunde+'%06objekt%05'+this.timelinesearchparameter.objekt+'%06rubrik%05'+this.timelinesearchparameter.rubrik+'%06aufart%05'+this.timelinesearchparameter.aufart+'%06aufnr%05'+this.timelinesearchparameter.aufnr+''+
        '%06vermittler%05'+this.timelinesearchparameter.vermittler+'%06vertreter%05'+this.timelinesearchparameter.vertreter+''+
        '%06vondatum%05'+this.timelinesearchparameter.vondatum+'%06bisdatum%05'+this.timelinesearchparameter.bisdatum+'%06verknuepfung%05'+this.timelinesearchparameter.verknuepfung+'%06mitarb%05' +this.loginparameter.mitarbeiter + '"}}';

    const headers = new HttpHeaders().set( "content-type", "application/json" );
    console.log(this.loginparameter.loginurl, body, {headers});
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_itauftragueber));
  }
//   private extractData(res:Response){
//      let resultJson = res.json();
//      let result = resultJson.REST[0].messageResponse;
//      let resultJson2 = JSON.parse(result);
//      let result2 = resultJson2.tt_itauftragueber;
//      console.log("service",result2);
//      return result2;

//   }
}
