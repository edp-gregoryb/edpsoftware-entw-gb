import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { AdrkundenService } from '../../../../shared/services/adrkunden.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-kundensuchfeld',
  templateUrl: './kundensuchfeld.component.html',
  styleUrls: ['./kundensuchfeld.component.css']
})
export class KundensuchfeldComponent implements OnInit {
  kontaktpersvalue: string;
  kontaktpersonen: any;
  kontaktpersbznr:string;
  kundetext: string;
  @Input() kundendata: any;
  beznrkunde: number;
  vnamekunde:string;
  zusatz1kunde:string;
  zusatz2kunde:string;
  zusatz3kunde:string;
  fnamekunde: string;
  strassekunde: string;
  ortkunde: string;
  formctrl = new FormControl();
  public filter: FormGroup;
  kunden:any;
  
  @Output() kundevalueChanged =new EventEmitter();
  constructor(private adrkundenService: AdrkundenService, private fb: FormBuilder) {
    this.filter = fb.group({
      'itemforsearch': fb.array([])
    });
    
  }

  ngOnInit() {
     console.log("this.kundendata",this.kundendata);
    if(this.kundendata){
      if(this.kundendata[0]){
        this.beznrkunde = this.kundendata[0].bbeznr;
        this.fnamekunde = this.kundendata[0].bfname;
        this.strassekunde = this.kundendata[0].bstrasse;
        this.ortkunde = this.kundendata[0].bort;
        this.vnamekunde = this.kundendata[0].bvname;
        this.zusatz1kunde = this.kundendata[0].bzusatz1;
        this.zusatz2kunde = this.kundendata[0].bzusatz2;
        this.zusatz3kunde = this.kundendata[0].bzusatz3;
        this.addformular(this.kundendata[0]);
        this.kundevalueChanged.next({value:this.kundendata[0].bbeznr});
      }
    }
    
    
  }
  // selectedvaluekunde(kunde){
  //   console.log("kunde", kunde);
  //   this.kundevalueChanged.next({value:kunde.bbeznr});
  //   this.beznrkunde = kunde.bbeznr;
  //   this.fnamekunde = kunde.bfname;
  //   this.strassekunde = kunde.bstrasse;
  //   this.ortkunde = kunde.bort;
  //   this.vnamekunde = kunde.bvname;
  //   this.zusatz1kunde = kunde.bzusatz1;
  //   this.zusatz2kunde = kunde.bzusatz2;
  //   this.zusatz3kunde = kunde.bzusatz3;
    
  
    
            
  // }
   kundewechseln(kunde) {
    // console.log("kundewechseln", kunde);
    this.kundevalueChanged.next({value:kunde.bbeznr});
    this.fnamekunde = kunde.bfname;
    this.ortkunde = kunde.bort;
    this.strassekunde = kunde.bstrasse;

  }
  // changeKunde(event) {
  //   // console.log("changekunde", event);
  //   this.adrkundenService.getKunde(event.query, 'yes', 'yes')
  //     .subscribe(kunden => { 
  //       this.kundendata = kunden;
        
        
  //     }, err => {
  //       console.error(err);
  //     });
  // }
  
    public Kunden(event):void {
    console.log("event",event);
    if(event.length >= 2){
            this.adrkundenService.getKunde(event, 'yes', 'yes')
            .subscribe((kunden)=> {
              
                        this.kunden = kunden;
                        // console.log("this.kunden",this.kunden);
                      },
                      (err) => {
                        console.warn(err);
                      }
                      );
               };

}
  public additemforsearch(val){
    this.addformular(val);
  }
  
  public closekunde(index: number){
     const control = <FormArray>this.filter.controls['itemforsearch'];
    // remove the chosen row
    control.removeAt(index);
  }
  
    public addformular(val){
    console.log("addformular",val);
    const itemforsearch = this.filter.controls['itemforsearch'] as FormArray;
    itemforsearch.push(this.fb.group({
        beznrkunde: [val.bbeznr],
        fnamekunde: [val.bfname],
        strassekunde: [val.bstrasse],
        ortkunde: [val.bort],
        vnamekunde: [val.bvname],
        zusatz1kunde: [val.bzusatz1],
        zusatz2kunde: [val.bzusatz2],
        zusatz3kunde: [val.bzusatz3]
        }));
    this.kundevalueChanged.next({value:val.beznr});    
  }
}
