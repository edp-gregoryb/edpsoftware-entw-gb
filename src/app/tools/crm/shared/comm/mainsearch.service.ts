import { Injectable } from '@angular/core';
// import { Subject ,  Observable }    from 'rxjs';
import { Subject } from 'rxjs';
@Injectable()
export class MainsearchService {
/*private subject = new Subject<any>();
 
    sendMessage(message: any) {
     // console.log("message",message);
        this.subject.next({ text: message });
    }
 
    clearMessage() {
        this.subject.next();
    }
 
    getMessage(): Observable<any> {
        console.log("message", this.subject.asObservable());
        return this.subject.asObservable();
    }*/
    private notify = new Subject<any>();
  /*
   * Observable string streams
   */
  notifyObservable$ = this.notify.asObservable();
  constructor() { }
  public notifyOther(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }
}
