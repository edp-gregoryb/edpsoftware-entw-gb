import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

// Fingerprint2 einbinden
declare var Fingerprint2: any;

@Injectable()
export class DataService {
    
  private notify = new Subject<any>();
  notifyObservable$ = this.notify.asObservable();
  browserFingerprint:any;
  constructor() {
      const promise = new Promise((resolve, reject) => {
      new Fingerprint2().get(function(fpresult, components){
          resolve(fpresult);
      });
    });
    promise.then((res) => {
        this.browserFingerprint = res;
        this.notifyOther(this.browserFingerprint);
        console.log('Deine Prüfsumme:' + this.browserFingerprint);
    });
    promise.catch((err) => {
        console.log("Fehler bei der Bildung der Prüfsumme.");
    });
      
  }
    
    public notifyOther(data: any) {
    if (data) {
      // console.log("test",data);
      this.notify.next(data);
    }
  }
 

}