import { Injectable } from '@angular/core';
// import { Http, URLSearchParams, Headers,Response,RequestOptions} from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable }  from 'rxjs';
import { LoginparameterService } from '../../../shared/services/loginparameter.service';
import { map } from 'rxjs/operators';

@Injectable()
export class SavetermindetailService {
  loginparameter: any;
  constructor(private http: HttpClient, private loginparameterService: LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  public saveTermindetail(termindetail) {
    termindetail.KontaktBeznr = termindetail.termKontaktBeznr;
    
    // console.log("this.loginparameter",this.loginparameter);
    console.log('service termindetail', termindetail.aktividcd, termindetail.termaktivcd);
    //alle " mit \" ersetzen, sodass JSON nicht invalid wird
    for(let property in termindetail){
      if(termindetail[property]){
        termindetail[property] = termindetail[property].toString().replace(/"/g, '\\"');
      }
    }
    
    let body = '{"request":{"filter":"restitsavetermdetail%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06firma%05' + this.loginparameter.loginfirma + '%06rowid%05' + termindetail.ROWID +
        '%06mitbeznr%05' + termindetail.mitbeznr + '%06termmitbeznr%05' + termindetail.termmitbeznr + '%06beznr%05' + termindetail.beznr + '%06rapdatum%05' + termindetail.rapdatum + '%06rapzeit%05' + termindetail.rapzeit +
        '%06aktividcd%05' + termindetail.aktividcd + '%06rapptext%05' + termindetail.rapptext + '%06termKontaktBeznr%05' + termindetail.termKontaktBeznr + '%06KontaktBeznr%05' + termindetail.KontaktBeznr +
        '%06termkontaktpers%05' + termindetail.termkontaktpers + '%06kontaktpers%05' + termindetail.termkontaktpers + '%06agentur%05' + termindetail.agenturbeznr +
        '%06termdatum%05' + termindetail.termdatum + '%06termzeit%05' + termindetail.termzeit + '%06termaktivcd%05' + termindetail.termaktivcd + '%06termrapptext%05' + termindetail.termrapptext +
        '%06objekt%05' + termindetail.objekt + '%06aktioncode%05' + termindetail.aktioncode + '%06grundcode%05' + termindetail.grundcode + '%06fazit%05' + termindetail.fazit +
        '%06aschlussel%05' + termindetail.aschlussel + '%06urubrik%05' + termindetail.urubrik + '%06rubrik%05' + termindetail.rubrik + '"}}'

     /*let jsondata = 'Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06firma%05' + this.loginparameter.loginfirma + '%06rowid%05' + termindetail.ROWID +
        '%06mitbeznr%05' + termindetail.mitbeznr + '%06termmitbeznr%05' + termindetail.termmitbeznr + '%06beznr%05' + termindetail.beznr + '%06rapdatum%05' + termindetail.rapdatum + '%06rapzeit%05' + termindetail.rapzeit +
        '%06aktividcd%05' + termindetail.aktividcd + '%06rapptext%05' + termindetail.rapptext + '%06termKontaktBeznr%05' + termindetail.termKontaktBeznr + '%06KontaktBeznr%05' + termindetail.KontaktBeznr +
        '%06termkontaktpers%05' + termindetail.termkontaktpers + '%06kontaktpers%05' + termindetail.termkontaktpers + '%06agentur%05' + termindetail.agenturbeznr +
        '%06termdatum%05' + termindetail.termdatum + '%06termzeit%05' + termindetail.termzeit + '%06termaktivcd%05' + termindetail.termaktivcd + '%06termrapptext%05' + termindetail.termrapptext +
        '%06objekt%05' + termindetail.objekt + '%06aktioncode%05' + termindetail.aktioncode + '%06grundcode%05' + termindetail.grundcode + '%06fazit%05' + termindetail.fazit +
        '%06aschlussel%05' + termindetail.aschlussel + '%06urubrik%05' + termindetail.urubrik + '%06rubrik%05' + termindetail.rubrik;

     let jsonbase64 = this.loginparameterService.stringtobase64(jsondata);*/
     // let body = '{"request":{"filter":"restitsavetermdetail%04'+jsonbase64+'"}}';


    const headers = new HttpHeaders().set( 'content-type', 'application/json' );
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res: Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_ittermdetail));
  }
  // private extractData(res:Response){
  //   let resultJson = res.json();
  //   let result = resultJson.REST[0].messageResponse;
  //   let resultJson2 = JSON.parse(result);
  //   let result2 = resultJson2.tt_ittermdetail;
  //   //console.log("service",result2);
  //   return result2;


  // }

}
