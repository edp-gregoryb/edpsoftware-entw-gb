import { Injectable } from '@angular/core';
// import { Http, URLSearchParams, Headers,Response,RequestOptions} from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable }  from 'rxjs';
import { LoginparameterService } from '../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable()
export class VerkaufschancenService {
loginparameter:any;
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
     this.loginparameter = this.loginparameterService.getparameter();
   }

   public showall (kunde:number,verknuepfung:string,obj:string,rubrik:string,urubrik:string){

   let body = '{"request":{"filter":"restitauftragueber%04Termid%05'+this.loginparameter.logintermid+'%06sprache%05'+this.loginparameter.loginsprache+'%06sicht%05A%06start%051%06anzahl%0550%06firma%05'+this.loginparameter.loginfirma+''+
        '%06kunde%05'+kunde+'%06objekt%05'+obj+'%06rubrik%05'+rubrik+'%06aufart%0503%06aufnr%05'+
        '%06vermittler%05%06vertreter%05'+
        '%06vondatum%05%06bisdatum%05%06verknuepfung%05'+verknuepfung+'%06urubrik%05'+urubrik+'%06mitarb%05' +this.loginparameter.mitarbeiter + '"}}';
   
   let jsondata = 'Termid%05'+this.loginparameter.logintermid+'%06sprache%05'+this.loginparameter.loginsprache+'%06sicht%05A%06start%051%06anzahl%0550%06firma%05'+this.loginparameter.loginfirma+''+
        '%06kunde%05'+kunde+'%06objekt%05'+obj+'%06rubrik%05'+rubrik+'%06aufart%0503%06aufnr%05'+
        '%06vermittler%05%06vertreter%05'+
        '%06vondatum%05%06bisdatum%05%06verknuepfung%05'+verknuepfung+'%06urubrik%05'+urubrik+'%06mitarb%05' +this.loginparameter.mitarbeiter;
        
   let jsonbase64 = this.loginparameterService.stringtobase64(jsondata);
     //let body = '{"request":{"filter":"restitauftragueber%04'+jsonbase64+'"}}';

    const headers = new HttpHeaders().set( "content-type", "application/json" );
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_itauftragueber));
  }
  
      public showallwithoutparam (search){
        let searchdaten = search;
   let body = '{"request":{"filter":"restitkampueber%04Termid%05'+this.loginparameter.logintermid+'%06sprache%05'+this.loginparameter.loginsprache+'%06firma%05'+this.loginparameter.loginfirma+'%06sicht%05'+searchdaten.sicht+''+
               '%06start%051%06anzahl%0550%06kunde%05*%06verknuepfung%05%06objekt%05%06rubrik%05%06urubrik%05%06"}}';


    const headers = new HttpHeaders().set( "content-type", "application/json" );
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_itkampueber));
  }
  // private extractData(res:Response){
  //    let resultJson = res.json();
  //    let result = resultJson.REST[0].messageResponse;
  //    let resultJson2 = JSON.parse(result);
  //    let result2 = resultJson2.tt_itauftragueber;
  //    //console.log("service",result2);
  //    return result2;

  //  }
}
