import { Component, OnInit } from '@angular/core';
import { AdrkundenService } from '../../../../../shared/services/adrkunden.service';
import { Kunden } from '../../../../../shared/entities/kunden';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';


import { Observable } from 'rxjs';

@Component({
  selector: 'app-umsatzkomp',
  templateUrl: './umsatzkomp.component.html',
  styleUrls: ['./umsatzkomp.component.css']
})
export class UmsatzkompComponent implements OnInit {

  public kunden: Array<Kunden> = [];
  public selectedKunde: Kunden;
  privatkunde:string = 'yes';
  allekunden:string = 'yes';
  
  public filter: FormGroup;
  
   formctrl = new FormControl();
  
  constructor(private kundenService:AdrkundenService, private fb: FormBuilder) { 
    
    this.filter = fb.group({
      'itemforsearch': fb.array([])
    });
 }

  ngOnInit() {
   
  }
  
  public Kunden(event):void {
    console.log("event",event);
    if(event.length >= 2){
            this.kundenService.getKunde(event, this.privatkunde, this.allekunden)
            .subscribe((kunden: Kunden[])=> {
              
                        this.kunden = kunden;
                        // console.log("this.kunden",this.kunden);
                      },
                      (err) => {
                        console.warn(err);
                      }
                      );
               };

}


public additemforsearch(val):void {
   console.log("val",val);
  const itemforsearch = this.filter.controls['itemforsearch'] as FormArray;
  itemforsearch.push(this.fb.group({
   firstname: [val.fname],
   lastname: [val.vname],
   kundennummer: [val.beznr]
   
  }));
}

public deleteitemforsearch(val): void {
    const itemforsearch = this.filter.controls['itemforsearch'] as FormArray;
     itemforsearch.removeAt(val );
}


}



