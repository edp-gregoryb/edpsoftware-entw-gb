import { Component, OnInit, EventEmitter, Output, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-aufnummer',
  templateUrl: './aufnummer.component.html',
  styleUrls: ['./aufnummer.component.css']
})
export class AufnummerComponent implements OnInit {

  auftragsnr:string;
  @Output() typedaufnr = new EventEmitter<any>();
  @Input() nummervonlink:string;
  
  constructor() { 
      let aufnrvonstorage = sessionStorage.getItem('timelineaufnr');
    if (aufnrvonstorage){
        let tempaufnr = JSON.parse(aufnrvonstorage);
        console.log("tempaufnr",tempaufnr.value);
        this.auftragsnr = tempaufnr.value;
        this.typedaufnr.next(tempaufnr.value);
    }
  }

  ngOnInit() {
    // if (this.nummervonlink){
    //   this.auftragsnr = this.nummervonlink;
    // }
    
   
    
  }
  
  ngOnChanes(){
  //this.auftragsnr = this.nummervonlink;
 
    
  }
  auftragsnrdelete(){
    console.log("auftragsnrdelete");
    this.typedaufnr.next('');
    sessionStorage.removeItem('timelineaufnr');
  }
  aufnummerchange(val){
    console.log("aufnummerchange",val);
    let tempjsonaufnr = JSON.stringify({'value': val});
      sessionStorage.setItem('timelineaufnr',tempjsonaufnr);
    this.typedaufnr.next(val);
    
  }
  
  // public auftragsnrchanges(val){
  //     console.log("auftragsnrchanges", val);
  //     this.typedaufnr.next(val);
  // }

}
