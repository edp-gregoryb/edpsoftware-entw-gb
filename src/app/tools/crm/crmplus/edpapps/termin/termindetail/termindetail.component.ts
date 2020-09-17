import { Component, OnInit, Input } from '@angular/core';
import { TermindetailService } from '../../../../shared/termindetail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { CookieService } from 'ng2-cookies';
import { appModules } from '../../../../../shared/const/appModules';
import { MainpaneleditComponent } from '../../../../shared/components/mainpaneledit/mainpaneledit.component';

@Component({
  selector: 'app-termindetail',
  templateUrl: './termindetail.component.html',
  styleUrls: ['./termindetail.component.css']
})
export class TermindetailComponent implements OnInit {
  @Input() returnlink:any;
  termindetails:any;
  urlparams:any;
  rapnrvonlink:any;
  kundevonlink:any;
  rubrikvonlink:any;
  urubrikvonlink:any;
  aschlusselvonlink:any;
  // public filter: FormGroup;
  // newbez
  // formctrl = new FormControl();
  currentAppModule: string    = "TEAD";
  modulename:string;
  lastAppModule: string       = "";
  currentUser: string = "";
  licensedModules: any = [];
  sidenavmodules:any = [];
  newTerm:any;
  terminneu:boolean = false;
  //returnlink:string;
  kundevonsuche:any;
  sidenavExpanded:boolean = false;



  constructor( private route:ActivatedRoute, private cookieService: CookieService) {
    var tempfilelocalstorage = this.cookieService.get('currentUser');
      if (tempfilelocalstorage){
      let currentUserstring = atob(tempfilelocalstorage);
      let userjson = JSON.parse(currentUserstring)
  
      // this.licensedModules  = userjson[0].berecht;
      // this.currentUser      = userjson[0].LoginVorname; 
      let licensedModulestemp  = userjson[0].module;
      this.currentUser      = userjson[0].LoginVorname; 
      
      for (let row of  licensedModulestemp){
       //console.log("row termindetail", row);
          this.licensedModules.push(row);
          if (row.shorthand == this.currentAppModule){
            this.modulename = row.name;
          }
        
      }
      //sidenav
      for (let row of  licensedModulestemp){
        if (row.show){
          this.sidenavmodules.push(row);
        }
      }
      
      // for (var i = 0; i < this.licensedModules.length; i++) {
      //   if ((this.licensedModules[i]==="") || (!appModules.find(x => x.shorthand == this.licensedModules[i]))){
      //     this.licensedModules.splice(i,1);         
      //     i--;
      //   }
      // }
      
      console.log("lizenzierte und frei gegebene Module für eingeloggten Benutzer", this.licensedModules);
      if (this.licensedModules.length == 1) console.log('User hat nur 1 lizenziertes Modul, daher direkter Start in diesem Modul. Route = ' + this.licensedModules.find(x => x.shorthand == this.licensedModules[0]).route);
      if (this.licensedModules.length == 0) console.log('User hat kein lizenziertes Modul, daher Meldung auf Home. Route = ./demo/demo-show');
      if (this.licensedModules.length > 1) console.log('User hat mehrere lizenzierte Module, daher Start auf Home. Route = ./demo/demo-show');
      
      }
      //this.lastAppModule = sessionStorage.getItem('lastmodule');
  }

  ngOnInit() {
    this.urlparams = this.route.params.subscribe(params => {
      
      if (params.rapnr){
        this.rapnrvonlink = params.rapnr;
      }
      
      if (params.kunde){
        this.kundevonlink = params.kunde;
      }
      
      if (params.rubrik){
        this.rubrikvonlink = params.rubrik;
      }
      
      if (params.urubrik){
        this.urubrikvonlink = params.urubrik;
      }
      
      if (params.aschlussel){
        this.aschlusselvonlink = params.aschlussel;
      }
      if (params){
        this.newTerm = params;
      }
      
      if (params.neu){
        this.terminneu = params.neu;
      }

      if (params.returnlink){
        this.returnlink = params.returnlink;
      }

      if (params.kundevonsuche){
       
        this.kundevonsuche = params.kundevonsuche;
      }
    });
    
    
    
    // this.termindetailService.getTermindetail(this.rapnrvonlink, this.kundevonlink, this.rubrikvonlink,this.urubrikvonlink,this.aschlusselvonlink)
    //   .subscribe(termindetail => {
    //     console.log("termindetail",termindetail);
    //     this.termindetails = termindetail;
    //       // for (let anzobj of termindetail){
    //       //       this.addformular(anzobj);
    //       //     }
      
        
        
        
    //   });
      
      
      
  
  }
  
  
  public kundenbezvonfazitchanged(val){
    console.log("kundenbezvonfazitchanged",val);
  }
  
  public kundenbezvonneuchanged(val){
    console.log("kundenbezvonneuchanged",val);
  }
  
  public termzeitvonfazitchanged(val){
    console.log("termzeitvonfazitchanged",val);
  }
  
  public gleicherterminevent(val){
    console.log("gleicherterminevent",val);
  }
  
  public sichtchange(val){}
  
  // public addformular(val){
  //   const itemforsearch = this.filter.controls['itemforsearch'] as FormArray;
  //   itemforsearch.push(this.fb.group({
  //       kundennummer: [val.beznr],
  //       kundenname: [val.NAME],
  //       kundenzusatz1: [val.zusatz1],
  //       kundenzusatz2: [val.zusatz2],
  //       kundenstrasse: [val.strasse],
  //       kundenort: [val.ort],
  //       kundentelpriv: [val.telge],
  //       kundentelgedi: [val.telgedi],
  //       kundentelnatel: [val.natel],
  //       kundenemail: [val.email],
  //       agenturnummer: [val.agenturbeznr],
  //       agenturname: [val.agenturname],
  //       agenturzusatz1: [val.agenturzusatz1],
  //       agenturzusatz2: [val.agenturzusatz2],
  //       agenturstrasse: [val.agenturstrasse],
  //       agenturort: [val.agenturort],
  //       agenturtelpriv: [val.agenturtelge],
  //       agenturtelgedi: [val.agenturtelgedi],
  //       agenturtelnatel: [val.agenturnatel],
  //       agenturemail: [val.agenturemail]
  //       }));
  //       // console.log("itemforsearch",itemforsearch);
  // }

}
