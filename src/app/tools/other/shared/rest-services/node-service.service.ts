import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {throwIfEmpty} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NodeServiceService {
  uri = 'http://localhost:4000';
  constructor(private http: HttpClient) { }


  getRenderTable() {
    return this.http.get('http://localhost:4000/getRenderTable');
  }

  refreshProgress(obj: string, aschlussel: string) {
    return this.http.get('http://localhost:4000/refreshProgress?objekt=' + obj + '&aschlussel=' + aschlussel);
  }

  refreshPage() {
    return this.http.get('http://localhost:4000/refreshPage');
  }

  addObjekt(obj: string, objbez: string, untertitel: string, aschlussel: string) {
    return this.http.get('http://localhost:4000/addObjekt?objekt=' + obj + '&objektbez=' + objbez + '&untertitel=' + untertitel + '&aschlussel=' + aschlussel);
  }

  login(termid) {
    return this.http.get('http://localhost:4000/login?termid=' + termid);
  }




}
