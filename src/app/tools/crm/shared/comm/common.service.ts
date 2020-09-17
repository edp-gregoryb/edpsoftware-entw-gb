import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable()
export class CommonService {
private notify = new Subject<any>();
private notify1 = new Subject<any>();
private notify2 = new Subject<any>();
private notify3 = new Subject<any>();
private notify4 = new Subject<any>();
private notify5 = new Subject<any>();
private notify6 = new Subject<any>();
private notify7 = new Subject<any>();
private notify8 = new Subject<any>();
private notify9 = new Subject<any>();
private notify10 = new Subject<any>();
private notify11 = new Subject<any>();
private notify12 = new Subject<any>();
private notify13 = new Subject<any>();
private notify14 = new Subject<any>();
private notify15 = new Subject<any>();
private notify16 = new Subject<any>();
private notify17 = new Subject<any>();
private notify18 = new Subject<any>();
// private notify19 = new Subject<any>();
  /**
   * Observable string streams
   */
  notifyObservable$ = this.notify.asObservable();
  notify1Observable$ = this.notify1.asObservable();
  notify2Observable$ = this.notify2.asObservable();
  notify3Observable$ = this.notify3.asObservable();
  notify4Observable$ = this.notify4.asObservable();
  notify5Observable$ = this.notify5.asObservable();
  notify6Observable$ = this.notify6.asObservable();
  notify7Observable$ = this.notify7.asObservable();
  notify8Observable$ = this.notify8.asObservable();
  notify9Observable$ = this.notify9.asObservable();
  notify10Observable$ = this.notify10.asObservable();
  notify11Observable$ = this.notify11.asObservable();
  notify12Observable$ = this.notify12.asObservable();
  notify13Observable$ = this.notify13.asObservable();
  notify14Observable$ = this.notify14.asObservable();
  notify15Observable$ = this.notify15.asObservable();
  notify16Observable$ = this.notify16.asObservable();
  notify17Observable$ = this.notify17.asObservable();
  notify18Observable$ = this.notify18.asObservable();
  // notify19Observable$ = this.notify19.asObservable();

  constructor() { }
  public notifyOther(data: any) {
    if (data) {
      // console.log("test",data);
      this.notify.next(data);
    }
  }
   public notifyOther1(data: any) {
    if (data) {
      // console.log("test1",data);
      this.notify1.next(data);
    }
  }
   public notifyOther2(data: any) {
    if (data) {
      // console.log("test2",data);
      this.notify2.next(data);
    }
  }
   public notifyOther3(data: any) {
    if (data) {
      // console.log("test3",data);
      this.notify3.next(data);
    }
  }
  public notifyOther4(data: any) {
    if (data) {
      // console.log("test4",data);
      this.notify4.next(data);
    }
  }
  public notifyOther5(data: any) {
    if (data) {
      // console.log("test5",data);
      this.notify5.next(data);
    }
  }
  public notifyOther6(data: any) {
    if (data) {
      // console.log("test6",data);
      this.notify6.next(data);
    }
  }
  public notifyOther7(data: any) {
    if (data) {
      // console.log("test7",data);
      this.notify7.next(data);
    }
  }
   public notifyOther8(data: any) {
    if (data) {
      // console.log("test8",data);
      this.notify8.next(data);
    }
  }
  public notifyOther9(data: any) {
    if (data) {
      // console.log("test9",data);
      this.notify9.next(data);
    }
  }
  public notifyOther10(data: any) {
    if (data) {
      // console.log("test10",data);
      this.notify10.next(data);
    }
  }
  public notifyOther11(data: any) {
    if (data) {
      // console.log("test12",data);
      this.notify11.next(data);
    }
  }
  public notifyOther12(data: any) {
    if (data) {
      // console.log("test12",data);
      this.notify12.next(data);
    }
  }
  public notifyOther13(data: any) {
    if (data) {
      // console.log("test13",data);
      this.notify13.next(data);
    }
  }
  public notifyOther14(data: any) {
    if (data) {
      // console.log("test14",data);
      this.notify14.next(data);
    }
  }
  public notifyOther15(data: any) {
    if (data) {
      // console.log("test15",data);
      this.notify15.next(data);
    }
  }
  public notifyOther16(data: any) {
    if (data) {
      // console.log("test15",data);
      this.notify16.next(data);
    }
  }
  public notifyOther17(data: any) {
    if (data) {
      // console.log("test17",data);
      this.notify17.next(data);
    }
  }
  public notifyOther18(data: any) {
    if (data) {
       //console.log("test18",data);
      this.notify18.next(data);
    }
  }
  // public notifyOther19(data: any) {
  //   if (data) {
  //     //console.log("test19",data);
  //     this.notify19.next(data);
  //   }
  // }
}
