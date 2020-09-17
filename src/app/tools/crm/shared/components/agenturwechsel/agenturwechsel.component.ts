import { Component, OnInit } from '@angular/core';
import { AgenturkundeService } from '../../services/agenturkunde.service';
import { AdrvermittlerService } from '../../services/adrvermittler.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { CommonService } from '../../comm/common.service';

@Component({
  selector: 'app-agenturwechsel',
  templateUrl: './agenturwechsel.component.html',
  styleUrls: ['./agenturwechsel.component.css']
})
export class AgenturwechselComponent implements OnInit {
  ortagentur: string;
  bznragentur:string;
  agenturtext: string;
  fnameagentur: string;
  fnamefirma: string;
  vnameagentur: string;
  zusatz1: string;
  zusatz2: string;
  zusatz3: string;
  zusatz1firma: string;
  zusatz2firma: string;
  strasseagentur: string;
  agenturort:string;
  telge:string;
  telgedi:string;
  telnatel:string;
  telpriv:string;
  email:string;
  agenturdata:any;
  termine:any;
  agenturdataback:any;
  agentureditieren:boolean = false;
 
  myControl = new FormControl();
  constructor(private agenturkundeService: AgenturkundeService, private adrvermittlerService:AdrvermittlerService,
  public dialogRef: MatDialogRef<AgenturwechselComponent>,private commonService: CommonService,
  ) { }

  ngOnInit() {
    
  // let temptermindetail = this.dialogRef.componentInstance;
  // this.termine = temptermindetail[0];
  this.termine = {}; 
  console.log("this.termine ",this.termine );
  }
  
  getAgenturInput(val){
      
      if (val.length >= 2){
          console.log("agentur",val);
          this.adrvermittlerService.showvermittler(val)
          .subscribe(agentur => {
            this.agenturdata = agentur;
            
        // console.log(this.agenturdata);
      }, err => {
        console.error(err);
      });
      }
  }
  
  neueAgentur(agenturdata){
    this.agentureditieren = true;
      console.log("this.agenturdata",agenturdata);
            this.bznragentur = agenturdata.beznr;
            this.vnameagentur = agenturdata.vname;
            this.fnameagentur = agenturdata.fname;
            this.zusatz1 = agenturdata.zusatz1;
            this.zusatz2 = agenturdata.zusatz2;
            this.fnamefirma = agenturdata.fnamefirma;
            this.zusatz1firma = agenturdata.zusatz1firma;
            this.zusatz2firma = agenturdata.zusatz2firma;
            this.agenturort = agenturdata.ort;
            this.strasseagentur = agenturdata.strasse;
            
            this.telge = '<a href="tel:'+agenturdata.telge+'">'+agenturdata.telge+'</a>';
           
            this.telgedi = '<a href="tel:'+agenturdata.telgedi+'">'+agenturdata.telgedi+'</a>';
            this.telnatel = '<a href="tel:'+agenturdata.natel+'">'+agenturdata.natel+'</a>';
            this.telpriv = '<a href="tel:'+agenturdata.telpriv+'">'+agenturdata.telpriv+'</a>';
            this.email = '<a href="mailto:'+agenturdata.email+'">'+agenturdata.email+'</a>';
            
            
            this.agenturdataback = {
              "bznragentur": this.bznragentur,
              "vnameagentur" : this.vnameagentur,
              "fnameagentur" : this.fnameagentur,
              "zusatz1" : this.zusatz1,
              "zusatz2" : this.zusatz2,
              "fnamefirma" : this.fnamefirma,
              "zusatz1firma" : this.zusatz1firma,
              "zusatz2firma" : this.zusatz2firma,
              "agenturort" : this.agenturort,
              "strasseagentur" : this.strasseagentur,
              "telge" : this.telge,
              "telgedi" : this.telgedi,
              "telnatel" : this.telnatel,
              "telpriv" : this.telpriv,
              "telgeforupdate" : agenturdata.telge,
              "telgediforupdate" : agenturdata.telgedi,
              "telnatelforupdate" : agenturdata.natel,
              "telprivforupdate" : agenturdata.telpriv,
              "email" : this.email,
              "agenturAnzeigen" : true
            }
            
            
            
  }
  
  agenturUebernehmen(){
    this.commonService.notifyOther18({ option: 'NeueAgentur', value: this.agenturdataback });
    //console.log("this.agenturdataback",this.agenturdataback);
  }

}
