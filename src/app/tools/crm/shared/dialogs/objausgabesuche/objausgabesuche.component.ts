import { Component, OnInit } from '@angular/core';
import { SearchobjausgabeComponent }from '../../components/searchobjausgabe/searchobjausgabe.component';
import { CommonService } from '../../comm/common.service';

@Component({
  selector: 'app-objausgabesuche',
  templateUrl: './objausgabesuche.component.html',
  styleUrls: ['./objausgabesuche.component.css']
})
export class ObjausgabesucheComponent implements OnInit {
  objausgabesuche:any;
 
  constructor(private commObserver: CommonService) { }

  ngOnInit() {
  }
   sucheagendaitemschanged(val){
    console.log("sucheagendaitemschanged",val);
    this.objausgabesuche = val;
    // this.commObserver.notifyOther1({ option: 'selectedvalue',value1: this.objausgabesuche.value1, value2: this.objausgabesuche.value2, value3:this.objausgabesuche.value3 });
  }
  
    
  

}
