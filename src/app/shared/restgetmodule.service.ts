import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";


@Injectable()
export class RestgetmoduleService {
loginparameter:any;

  constructor(private http: HttpClient) {
    
  }


  public getModule(instanz,termid) {

    let body = '{"request":{"filter":"restgetmodule%04Termid%05' + termid + '%06sprache%05d%06firma%052"}}'

     const headers = new HttpHeaders().set( "content-type", "application/json" );


    return this.http.post(instanz,body,{headers})
                      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_getmodule));
                      
  }
  
    

}