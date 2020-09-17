import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';
import { AdrkundenService } from '../../../../shared/services/adrkunden.service';
import { AgenturkundeService } from '../../services/agenturkunde.service';
import { AdrvermittlerService } from '../../services/adrvermittler.service';
import { SafepipePipe } from '../../pipes/safepipe.pipe';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-agentursuchfeld',
  templateUrl: './agentursuchfeld.component.html',
  styleUrls: ['./agentursuchfeld.component.css']
})
export class AgentursuchfeldComponent implements OnInit {
  ortagentur: string;
  bznragentur:string;
  agenturtext: string;
  @Input() agenturdata: any;
  @Input() objekt:string;
  @Input() beznr:string;
  fnameagentur: string;
  vnameagentur: string;
  zusatz1agentur: string;
  zusatz2agentur: string;
  zusatz3agentur: string;
  strasseagentur: string;
  telgeagentur:string;
  telgediagentur:string;
  natelagentur:string;
  emailagentur:any;
  isActiveAgentur:boolean = false;
  plusminus:string = '+';
  @Output() agenturvalueChanged =new EventEmitter();
  agenturctrl = new FormControl();
  options:any;
  //@Output() agenturChanged =new EventEmitter();
  constructor(private agenturkundeService: AgenturkundeService, private adrvermittlerService:AdrvermittlerService) { }

  ngOnInit() {
    if (this.agenturdata){
      this.bznragentur = this.agenturdata[0].agenturbeznr;
    this.fnameagentur = this.agenturdata[0].agenturname;
    this.vnameagentur = this.agenturdata[0].agenturvorname;
    this.zusatz1agentur = this.agenturdata[0].agenturzusatz1;
    this.zusatz2agentur = this.agenturdata[0].agenturzusatz2;
    this.strasseagentur = this.agenturdata[0].agenturstrasse;
    this.ortagentur = this.agenturdata[0].agenturort;
    this.telgeagentur = '<a  href="tel:'+this.agenturdata[0].agenturtelge+'">'+this.agenturdata[0].agenturtelge+'</a>';
    this.telgediagentur = '<a href="tel:'+this.agenturdata[0].agenturtelgedi+'">'+this.agenturdata[0].agenturtelgedi+'</a>';
    this.natelagentur = '<a href="tel:'+this.agenturdata[0].agenturnatel+'">'+this.agenturdata[0].agenturnatel+'</a>';
    this.emailagentur = '<a href="mailto:'+this.agenturdata[0].agenturemail+'">'+this.agenturdata[0].agenturemail+'</a>';
    
    
    this.agenturvalueChanged.next({value:this.agenturdata[0].agenturbeznr});
    // console.log("this.agenturdata[0].agenturbeznr",this.agenturdata[0].agenturbeznr);
    if (this.agenturdata[0].agenturbeznr === 0)
      this.isActiveAgentur = false;
      this.plusminus = '+';
    } else {
      this.isActiveAgentur = true;
      this.plusminus = '-';
    }
    
  }
  onAppSelect(val){
    console.log("onAppSelect",val);
  }
    agenturnameChange(event){
    console.log("event",event);
    if(event.length >= 2){
      this.adrvermittlerService.showvermittler(event)
              .subscribe(kunde => {
                this.options = kunde;
                // console.log("kunde",this.options);
              }, err => {
        console.error(err);
      });
    }
   
  }
  agenturselected(agentur){
  console.log("agentur",agentur);
    if (agentur) {
       //this.agenturChanged.next(agenturnr);
    this.agenturvalueChanged.next({value:agentur.beznr});
    this.bznragentur = agentur.beznr;
    this.fnameagentur = agentur.fname;
    this.vnameagentur = agentur.vname;
    this.zusatz1agentur = agentur.zusatz1;
    this.zusatz2agentur = agentur.zusatz2;
    this.zusatz3agentur = agentur.zusatz3;
    this.strasseagentur = agentur.strasse;
    this.ortagentur = agentur.ort;
    this.telgeagentur = '<a  href="tel:'+agentur.telge+'">'+agentur.telge+'</a>';
    this.telgediagentur = '<a href="tel:'+agentur.telgedi+'">'+agentur.telgedi+'</a>';
    this.natelagentur = '<a href="tel:'+agentur.natel+'">'+agentur.natel+'</a>';
    this.emailagentur = '<a href="mailto:'+agentur.email+'">'+agentur.email+'</a>';
    
    } else {
      console.log("kein agentur ausgewählt");
    }
  }
  deleteagentur(val){
    console.log("deleteagentur",val);
    this.agenturvalueChanged.next({value:0});
    
    this.bznragentur = "0";
    this.fnameagentur = "";
    this.vnameagentur = "";
    this.zusatz1agentur = "";
    this.zusatz2agentur = "";
    this.zusatz3agentur = "";
    this.strasseagentur = "";
    this.ortagentur = "";
    this.telgeagentur = '<a  href="tel:"></a>';
    this.telgediagentur = '<a  href="tel:"></a>';
    this.natelagentur = '<a  href="tel:"></a>';
    this.emailagentur = '<a  href="mailto:"></a>';
    this.isActiveAgentur = false;
    this.plusminus = '+';
  }
  
  // changeAgentur(event) {
  //   console.log("event",event);
    
  //   // this.adrvermittlerService.showvermittler(event.query)
  //   //   .subscribe(agentur => {
  //   //     this.agenturdata = agentur;
  //   //     // console.log(this.agenturdata);
  //   //   }, err => {
  //   //     console.error(err);
  //   //   });
  // }
  agenturwechseln(agentur) {
    // console.log("agenturwechseln", agentur);
    this.bznragentur = agentur.beznr;
    this.agenturvalueChanged.next({value:agentur.beznr});
    /*this.nameagentur = agentur.fname;
    this.strasseagentur = agentur.strasse;
    this.ortagentur = agentur.ort;*/
  }
  // selectedvalueagentur(agentur){
  //   // console.log("agentur", agentur);
  //   this.agenturvalueChanged.next({value:agentur.beznr});
  //   this.bznragentur = agentur.beznr;
  //   this.fnameagentur = agentur.fname;
  //   this.vnameagentur = agentur.vname;
  //   this.zusatz1agentur = agentur.zusatz1;
  //   this.zusatz2agentur = agentur.zusatz2;
  //   this.zusatz3agentur = agentur.zusatz3;
  //   this.strasseagentur = agentur.strasse;
  //   this.ortagentur = agentur.ort;
  // }
   agentureditieren() {
    // console.log("click agentur");
    if (this.isActiveAgentur === false) {
      this.isActiveAgentur = true;
      // console.log("click agentur",this.isActiveAgentur);
       this.plusminus = '-';
    } else {
      this.isActiveAgentur = false;
      // console.log("click agentur",this.isActiveAgentur);
       this.plusminus = '+';

    }
  }
  // showagentur(){
  //   this.agenturkundeService.showagenturkude(this.beznr,this.objekt)
  //     .subscribe(agentur => {
  //       this.agenturdata = agentur;
  //       // console.log(this.agenturdata);
  //     }, err => {
  //       console.error(err);
  //     });
  // }
}
