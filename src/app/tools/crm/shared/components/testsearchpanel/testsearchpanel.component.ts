import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    Output,
    ViewContainerRef,
    EventEmitter,
    OnChanges,
    AfterViewInit,
    ViewChild, ElementRef
} from '@angular/core';
import { Router } from '@angular/router'
import { TerminService } from '../../termin.service';
import { Subscription} from 'rxjs';
import { CommonService } from '../../comm/common.service';
import {DocumentIndex} from 'ndx';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-testsearchpanel',
  templateUrl: './testsearchpanel.component.html',
  styleUrls: ['./testsearchpanel.component.css']
})
export class TestsearchpanelComponent implements OnInit, AfterViewInit {

  private subscription: Subscription;
  data: any = null;
  @Input() termines:any = null;
  @Input() vonAgenda:boolean;
  @Input() parameterfursuche:any;
  @Input() kundenbez_neu:any;
  @Input() kundenbez_edit:any;
  @Input() vonFazit:number;
  @Input() nichtAgenda:number;
  @Input() termzeitvonfazit:any;
  @Input() rapnrvonfazit:any;
  @Input() zeiteventfurneuenterminevent:any;
  @Input() postp15:any;
  auswahlmenu: any;
  MainPanelTitle: string = "das ist ein Test";
  isAngezeigt:boolean =false;
  anzahltermine:number;
  @Output() click = new EventEmitter();
  @Output() rapnrchanged = new EventEmitter();
  @Output() beznrchanged = new EventEmitter();
  @Output() terminchanged = new EventEmitter();
  @Output() keintermin = new EventEmitter();
  @Output() postponetermin = new EventEmitter();
  @Output() termincountchanged = new EventEmitter();
  klicktindex:number = 0;
  posttermin:boolean = false;
  private resizeSubscription:Subscription;
  gleichesdatum:any = [];
  scrolling:any;
  minInnerHeight:number = 0;
    val0: any;
    tempSections: any;
    itemauswahl: any;
    vonfilter: any;
    @ViewChild('scrollItems', { read: ElementRef, static: false }) public scrollItems: ElementRef<any>;
  
  public sections = [
    {name:"Bird",img:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Hummingbird.jpg/320px-Hummingbird.jpg"},
    {name:"Wheel", img:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/The_OC_Fair_ferris_wheel.jpg/320px-The_OC_Fair_ferris_wheel.jpg"},
    {name:"Horses", img:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/D%C3%BClmen%2C_Merfeld%2C_D%C3%BClmener_Wildpferde_in_der_Wildbahn_--_2016_--_4740.jpg/320px-D%C3%BClmen%2C_Merfeld%2C_D%C3%BClmener_Wildpferde_in_der_Wildbahn_--_2016_--_4740.jpg"},
    {name:"Lamp",img:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Gl%C3%BChlampe_explodiert.jpg/320px-Gl%C3%BChlampe_explodiert.jpg"}];

  constructor(private terminService: TerminService,
              private commonService: CommonService, private _snackBar: MatSnackBar,
              public viewContainerRef: ViewContainerRef, private router: Router) {
                if(this.router.url === '/agendaview/agendaitems-show'){
                  this.minInnerHeight = Number(sessionStorage.getItem('VEAGscroll')) + 850;
                  this.vonfilter = true;
                } else if(this.router.url === '/projektview/projekte-show'){
                  this.minInnerHeight = Number(sessionStorage.getItem('VEAUscroll')) + 850;
                  this.vonfilter = sessionStorage.getItem('AusgabeSuche');
                }
  }
  
  ngAfterViewInit(){
    if(this.router.url === '/agendaview/agendaitems-show'){
      document.getElementById('scrollID').scrollTop = Number(sessionStorage.getItem('VEAGscroll'));
    } else if (this.router.url === '/projektview/projekte-show'){
      document.getElementById('scrollID').scrollTop = Number(sessionStorage.getItem('VEAUscroll'));
    }
  }
  
  public onElementScroll(event){
    this.scrolling = event;
    // console.log("scroll",this.scrolling);
  }
  
  public onreziseElement(event){
    // console.log("onreziseElement",event);
  }
  
  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }

    this.subscription.unsubscribe();
  }
 
   ngOnChanges(changes: any){
     console.log("this.vonFazit",this.vonFazit, this.nichtAgenda, this.termzeitvonfazit, this.parameterfursuche,this.kundenbez_neu, this.zeiteventfurneuenterminevent);
     var data = sessionStorage.getItem('switchtoagenda');
     if (data){
      
    // var datajsontemp = JSON.stringify(data);
     var datajson = JSON.parse(data);
     sessionStorage.removeItem('switchtoagenda');
      console.log("back von Offerte vor If", datajson.beznr );
     if (datajson.beznr > 0 && datajson.rapnr > 0 && this.router.url === '/agendaview/agendaitems-show'){
          console.log("back von Offerte" );
          var klick = sessionStorage.getItem('VEAGklicktindex');
           this.terminService.showall()
          .subscribe(termine => {
            this.termines = termine;
            this.anzahltermine = this.termines.length;
            this.termincountchanged.next(this.anzahltermine);
            this.beznrchanged.next(datajson.beznr);
            this.openselected(this.termines, klick);
            this.tempSections = this.termines;

          }, err => {
            console.error(err);
          });
        } else if (this.router.url === '/projektview/projekte-show'){
            var klick = sessionStorage.getItem('VEAUklicktindex');
            this.vonfilter = sessionStorage.getItem('AusgabeSuche');
              var vonfilter:any = sessionStorage.getItem('AusgabeSuche');
              if (vonfilter){
                var tempvonfilter = JSON.parse(vonfilter);
                console.log("tempvonfilter", tempvonfilter);
              this.loadagendamitFiltermitIndex('',tempvonfilter.value3,tempvonfilter.value1,tempvonfilter.value2,datajson.beznr, klick);
              
      }
        } else if (this.router.url === '/kundenview/kunden-show'){
              // var vonTerminfilter = sessionStorage.getItem('switchtoagenda');
                console.log("vor dem filter vonfilter", data);
                if (data){
                   var terminfilterTemp = JSON.parse(data);
                   console.log("vonfilter", terminfilterTemp);
                //this.loadagendamitFilterforTermin(terminfilterTemp);
                
                 this.loadagendamitFiltermitIndex(terminfilterTemp.beznr,'','','',terminfilterTemp.beznr, klick);
                // console.log("von Kunde",this.parameterfursuche);
                // this.terminchanged.next(this.parameterfursuche);
                 this.beznrchanged.next(terminfilterTemp.beznr);
                 this.keintermin.next(true);
        
      }
        }
     }
      else {
     
     
  if(this.parameterfursuche){
  this.terminService.showone(this.parameterfursuche.beznr,this.parameterfursuche.sicht,this.parameterfursuche.obj,this.parameterfursuche.aschluessel)
      .subscribe(termine => {
        this.termines = termine;
        this.anzahltermine = this.termines.length;
        this.termincountchanged.next(this.anzahltermine);
        this.tempSections = this.termines;
        console.log("parameterfursuche");
        if (this.parameterfursuche.beznr > 0){
          this.loadagendamitFilter(this.parameterfursuche.beznr,this.parameterfursuche.sicht,'','');
          console.log("von Kunde",this.parameterfursuche);
          this.terminchanged.next(this.parameterfursuche);
          this.beznrchanged.next(this.parameterfursuche.beznr);
          this.keintermin.next(true);
        } else{
        this.loadagendamitFilter('',this.parameterfursuche.sicht,this.parameterfursuche.obj,this.parameterfursuche.aschluessel);
        }
      }, err => {
        console.error(err);
      });
  }
   else if (this.kundenbez_neu){
     console.log("this.kundenbez_neu",this.kundenbez_neu);
   this.terminService.showone(this.kundenbez_neu,'M','','')
       .subscribe(termine => {
         this.termines = termine;
           this.tempSections = this.termines;
          this.anzahltermine = this.termines.length;
           this.tempSections = this.termines;
          this.termincountchanged.next(this.anzahltermine);
    // console.log("this.termines", this.termines);
       }, err => {
         console.error(err);
       });
   } else if (this.vonFazit !== 0 && this.nichtAgenda === 0 ) {
     console.log("loadagenda");
     this.loadagenda();
   } else if (this.vonFazit !== 0 && this.nichtAgenda >= 1 ){
     console.log("vonfilter");
      var vonfilter:any = sessionStorage.getItem('AusgabeSuche');
       console.log("vor dem filter vonfilter", vonfilter);
      if (vonfilter){
         console.log("vonfilter", vonfilter);
         this.loadagendamitFilter('',vonfilter.value3,vonfilter.value1,vonfilter.value2);
      }
      
   }
    }

    if (this.postp15 === true){
      this.postpone15();
    }
  }

  ngOnInit() {
    this.subscription = this.commonService.notify5Observable$.subscribe((res) => {
      if (res.hasOwnProperty('option')&& res.option === 'TerminFazit') {
        // console.log("abbrechen", res.value); 
        this.terminService.showall()
          .subscribe(termine => {
            this.termines = termine;
            this.anzahltermine = this.termines.length;
            this.termincountchanged.next(this.anzahltermine);
              this.tempSections = this.termines;
            // for (var i = 0;i< termine.length -1;i++){
            //   this.checkaktivitem(termine[i].termdatum,termine[i].termzeit,i);
            // }
            // console.log("this.termines", this.termines);
             this.openfirst(termine);
          }, err => {
            console.error(err);
          });
    } else if (res.hasOwnProperty('option')&& res.option === 'TerminNeu'){
        // console.log("terminneu", res.value); 
        this.terminService.showone(res.value,'M','','')
          .subscribe(termine => {
            this.termines = termine;
              this.tempSections = this.termines;
            // for (var i = 0;i< termine.length -1;i++){
            //   this.checkaktivitem(termine[i].termdatum,termine[i].termzeit,i);
            // }
            // console.log("this.termines", this.termines);
            // this.openfirst(termine);
          }, err => {
            console.error(err);
          });
    } else if (res.hasOwnProperty('option')&& res.option === 'TerminAusgabe'){
         console.log("TerminAusgabe", res); 
        this.terminService.showAschluessel(res.value1,'','',res.value2)//obj, rubrik, urubrik,aschluessel
          .subscribe(termine => {
            this.termines = termine;
            this.anzahltermine = this.termines.length;
            this.termincountchanged.next(this.anzahltermine);
              this.tempSections = this.termines;
          }, err => {
            console.error(err);
          });
    } else if (res.hasOwnProperty('option')&& res.option === 'TerminKunden'){
         console.log("TerminKunden", res); 
        this.terminService.showone(res.value1,'','','')//obj, rubrik, urubrik,aschluessel
          .subscribe(termine => {
            this.termines = termine;
            this.anzahltermine = this.termines.length;
            this.termincountchanged.next(this.anzahltermine);
              this.tempSections = this.termines;
          }, err => {
            console.error(err);
          });
    }
  }); 
    
    //autorefresher
    if (this.router.url === '/agendaview/agendaitems-show'){
      //für backbutton offerten wenn nur ein Termin ansteht
      if(!sessionStorage.getItem('VEAGklicktindex')){
        sessionStorage.setItem('VEAGklicktindex', "0");
      }

    } else if (this.router.url === '/projektview/projekte-show'){
        //für backbutton offerten wenn nur ein Termin ansteht
      if(!sessionStorage.getItem('VEAUklicktindex')){
        sessionStorage.setItem('VEAUklicktindex', "0");
      }
        console.log( "ohne refresh stehe auf Ausgabe");
    } else {
     console.log( "ohne refresh stehe auf Kunde");
         
    }
    
    sessionStorage.setItem('reiter', this.router.url);
    
  }
 
  loadagenda(){
    
      this.terminService.showall()
          .subscribe(termine => {
            this.termines = termine;
            this.anzahltermine = this.termines.length;
            this.termincountchanged.next(this.anzahltermine);
            this.gleichesdatum = this.checkDuplicateInObject('termdatum', this.termines);
              this.tempSections = this.termines;
            //console.log("this.termines",this.termines );
            // this.distinctDates = [...new Set(termine.map(item => item.termdatum))];
            // console.log("unique",this.distinctDates );
            this.openfirst(this.termines);
              console.log('this.termines', this.termines)
              if (this.termines.length === 0) {
                  this.vonfilter = false;
              }
          }, err => {
            console.error(err);
          });
  }

  
  loadagendamitFilter(filter0,filter3,filter1,filter2){
     this.terminService.showone(filter0,filter3,filter1,filter2)
       .subscribe(termine => {
         this.termines = termine;
           this.tempSections = this.termines;
         this.anzahltermine = this.termines.length;
         this.termincountchanged.next(this.anzahltermine);
         this.gleichesdatum = this.checkDuplicateInObject('termdatum', this.termines);
          this.openfirst(this.termines);
   console.log("loadagendamitFilter", termine);
        if (termine.length === 0) {
            this._snackBar.open('Keine Daten vorhanden', '', {
                duration: 2000, horizontalPosition: 'left', verticalPosition: 'top'
            });
        }
       }, err => {
         console.error(err);
       });
  }
  
    loadagendamitFiltermitIndex(filter0,filter3,filter1,filter2,beznr,klick){
     this.terminService.showone(filter0,filter3,filter1,filter2)
       .subscribe(termine => {
         this.termines = termine;
           this.tempSections = this.termines;
         this.anzahltermine = this.termines.length;
         this.termincountchanged.next(this.anzahltermine);
         this.gleichesdatum = this.checkDuplicateInObject('termdatum', this.termines);
          this.beznrchanged.next(beznr);
             this.openselected(this.termines, klick);
   console.log("loadagendamitFilter");
       }, err => {
         console.error(err);
       });
  }

  
  openselected(terminlist,index){
    console.log("openselected", terminlist);
    if (terminlist.length !== 0){
      var termine = terminlist[index];
      this.rapnrchanged.next(termine.rapnr);
      this.beznrchanged.next(termine.beznr);
      this.terminchanged.next(termine);
      termine.isAngezeigt =true;
    }
  }

  openfirst(terminlist){
    if (terminlist){
      //console.log("openfirst",terminlist);
      let klicktIndex = '0';
      if (this.router.url === '/agendaview/agendaitems-show'){
        klicktIndex = sessionStorage.getItem('VEAGklicktindex');
      } else if(this.router.url === '/projektview/projekte-show'){
        klicktIndex = sessionStorage.getItem('VEAUklicktindex');
      }
      var termine = terminlist[klicktIndex];
      if (terminlist.length >= Number(klicktIndex)+1 ){
        this.rapnrchanged.next(termine.rapnr);
        this.beznrchanged.next(termine.beznr);
        this.terminchanged.next(termine);
        this.keintermin.next(true);
        termine.isAngezeigt =true;
      } else {
      console.log("terminlist leer");
      this.keintermin.next(false); 
    }
    } 

  }

  over(event) {
    //console.log("mousover", event);
    if(this.termines === null){
      return;
    }
    var count = 0;
    for (; count <= this.termines.length - 1; count++) {
      if (event === this.termines[count].NAME) {

        this.auswahlmenu = event;
      }
      //console.log("mousover", this.termines[i].NAME);
    }


    if (event.type === "mouseleave") {
      this.auswahlmenu = '';
    }
  }
  
  onclick(event:Event,button:string,termine,overlaypanel,index) {//termine,
    event.stopPropagation();
    // console.log("button", button,event,index);
    this.termines.map((navItem) => {
      navItem.isAngezeigt = navItem === termine;
    });
    
    this.rapnrchanged.next(termine.rapnr);
    this.beznrchanged.next(termine.beznr);
    this.terminchanged.next(termine);
    this.click.next(button);
    if (button === "onSubmit"){
      console.log("onSubmit",index);
      this.klicktindex = index;
    sessionStorage.setItem('reiter', this.router.url);
    this.isAngezeigt =true;
    // this.minlata_15 = this.checkaktuellDate(termine.termdatum, termine.termzeit);
    // this.minlata_60 = this.checkaktuellDate(termine.termdatum, termine.termzeit);
    // this.minlata_1T = this.checkaktuellDate(termine.termdatum, termine.termzeit);
  
    } else if (button === "onSelectpostpone") {
       console.log("onSelectpostpone");
    //  overlaypanel.toggle(event);
    }else if (button === "onSelectEmail") {
      console.log("onSelectEmail");
     // overlaypanel.toggle(event);
    }else if (button === "onSelectTel") {
       console.log("onSelectTel",termine.telpriv);
     // overlaypanel.toggle(event);
      /*this.privtel = '<a href="tel:'+termine.telpriv+'">'+termine.telpriv+'</a>';
      this.telge = '<a href="tel:'+termine.telge+'">'+termine.telge+'</a>';
      this.telgedi = '<a href="tel:'+termine.telgedi+'">'+termine.telgedi+'</a>';
      this.natel = '<a href="tel:'+termine.natel+'">'+termine.natel+'</a>';
      this.email = '<a href="tel:'+termine.email+'">'+termine.email+'</a>';*/
    }
    
   
  }
  
  postpone15() {
     var verschrueck:any = null;
     var endzeit:any = null;
     this.posttermin = true;

    this.postponetermin.next(true);
    this.terminService.showall()
          .subscribe(termine => { this.termines = termine;
          this.postponetermin.next(this.posttermin);
          }, err => {
            console.error(err);
          });
    
  }

  public checkDuplicateInObject(propertyName, inputArray) {
    let seenDuplicate = false,
        testObject = {};
        let result = {};
        let gdatum = [];
        
        
        if (inputArray instanceof Array) { // Check if input is array.
          inputArray.forEach(function (v, i) {
            //console.log("v",v[propertyName]);
            //console.log("result",result);
              if (!result[v[propertyName]]) { // Initial object property creation.
                  result[v[propertyName]]=[i]; // Create an array for that property.
              } else { // Same occurrences found.
                  result[v[propertyName]].push(i); // Fill the array.
              }
          });
      }
    console.log("result",result);
    return result;
  }
  
  public auswahlevent(val){
    //sessionStorage.setItem('VEAGscroll', this.scrolling.target.scrollTop);
    //console.log("auswahlevent",val);
    this.termines.map((navItem) => {
      navItem.isAngezeigt = navItem === val.termin;
    });
    
    
    this.rapnrchanged.next(val.termin.rapnr);
    this.beznrchanged.next(val.termin.beznr);
    this.terminchanged.next(val.termin);
    
    if (this.router.url === '/agendaview/agendaitems-show'){
      sessionStorage.setItem('VEAGscroll', (document.getElementById('scrollID').scrollTop).toString());
      sessionStorage.setItem('VEAGklicktindex', val.index);
      
    } else if(this.router.url === '/projektview/projekte-show'){
      sessionStorage.setItem('VEAUscroll', (document.getElementById('scrollID').scrollTop).toString());
      sessionStorage.setItem('VEAUklicktindex', val.index);
    }
    sessionStorage.setItem('reiter', this.router.url);
    
    this.isAngezeigt =true;

  }

    goBack() {
        // console.log('goBack', this.scrollItems.nativeElement.scrollTop);
        // this.scrollItems.nativeElement.scrollTop = this.minInnerHeight;
        if (this.router.url === '/agendaview/agendaitems-show') {
            this.minInnerHeight = Number(sessionStorage.getItem('VEAGscroll'));
            this.scrollItems.nativeElement.scrollTop = this.minInnerHeight;
        } else if(this.router.url === '/projektview/projekte-show') {
            this.minInnerHeight = Number(sessionStorage.getItem('VEAUscroll'));
            this.scrollItems.nativeElement.scrollTop = this.minInnerHeight;
        }
    }

    searchItems(event) {
        // console.log('this.tempSections', this.tempSections);
        if (!event) {
             //console.log('this.tempSections', this.tempSections);
            this.termines = this.tempSections;
        } else {
            console.log("searchItems", event);
            this.itemauswahl = this.termines;
            const index = new DocumentIndex();
            index.addField("NAME");
            index.addField("termkontaktpers");
            index.addField("objekt");
            index.addField("rubrik");
            index.addField("termdatum");
            index.addField("termrapptext");
            index.addField("vertr_name");
            this.itemauswahl.forEach((doc) => {
                index.add(doc, doc);
            });
            var obj = index.search(event);
             //console.log("index",obj);

            var tempjsonArray = [];
            for (let i = 0; i <= obj.length - 1; i++) {
                tempjsonArray.push(obj[i].docId);
            }
            this.termines = tempjsonArray;
            //console.log("index nach suche",this.termines);
            this.scrollItems.nativeElement.scrollTop = 0;
        }


    }
}
