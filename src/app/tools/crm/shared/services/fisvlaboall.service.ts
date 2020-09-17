import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable }  from 'rxjs';
import { LoginparameterService } from './../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FisvlaboallService {

  loginparameter:any;
 constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
   }
   
     public getAllabo (kunde:string){
   let body = '{"request":{"filter":"fisVLAboAll%04sprache%05'+this.loginparameter.loginsprache+'%06BenutzerID%05%06adressnr%05'+kunde+'%06firma%05'+this.loginparameter.loginfirma+'"}}';
 
   
        const headers = new HttpHeaders().set( "content-type", "application/json" );
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST']))
                      //.pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res));
  }
}
