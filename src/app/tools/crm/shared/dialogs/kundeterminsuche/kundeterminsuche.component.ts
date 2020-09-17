import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-kundeterminsuche',
  templateUrl: './kundeterminsuche.component.html',
  styleUrls: ['./kundeterminsuche.component.css']
})
export class KundeterminsucheComponent implements OnInit {
 onRowclick:any = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  sucheagendaitemschanged(val){
    // console.log("sucheagendaitemschanged",val);
    this.onRowclick.next(val);
  }

}
