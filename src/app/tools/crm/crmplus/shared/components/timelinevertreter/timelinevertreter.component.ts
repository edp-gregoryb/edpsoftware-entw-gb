import { Component, OnInit , Output, EventEmitter, Input} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';


import { Observable } from 'rxjs';
import { RestitgebabfrageService } from '../../services/restitgebabfrage.service';


@Component({
  selector: 'app-timelinevertreter',
  templateUrl: './timelinevertreter.component.html',
  styleUrls: ['./timelinevertreter.component.css']
})
export class TimelinevertreterComponent implements OnInit {

  vertretervalue:string;
  public filter: FormGroup;
  formctrl = new FormControl();
  vertreters:any;
  @Output() selectedVertreter = new EventEmitter<any>();
  @Input() sicht: string;
  @Input() vertretervonlink:string;
  
  
  constructor(private restitgebabfrageService:RestitgebabfrageService) { 
         let vertreter = sessionStorage.getItem('timelinevertreter');
    if (vertreter){
        let tempvertreter = JSON.parse(vertreter);
        console.log("tempvertreter",tempvertreter);
        this.vertretervalue = tempvertreter.vertreter;
        this.selectedVertreter.next(tempvertreter.vertreter);
    }
  }

  ngOnInit() {
     
  }

public Vertreterchange(event):void {
    console.log("event",event);
    if(event === undefined){console.log("event = undefined");} else {
    if(event !== "undefined" && event.length >= 2){
            this.restitgebabfrageService.getVertreter(this.sicht)
            .subscribe((vert)=> {
              
                        this.vertreters = this.filterByString(vert, event);
                        
                      },
                      (err) => {
                        console.warn(err);
                      }
                      );
               } else {
                 console.log("zurücksetzen der variable vertreternvalue");
                this.selectedVertreter.next('');
               }
               };

}

public filterByString(data, filterValue) {
   filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // || e.objekt.toLowerCase().includes(filterValue)
   return data.filter(e => e.vertreter.toLowerCase().includes(filterValue))
       .sort((a,b) => a.vertreter.includes(filterValue) && !b.vertreter.includes(filterValue) ? -1 : b.vertreter.includes(filterValue) && !a.vertreter.includes(filterValue) ? 1 :0);
}

public additemforsearch(val):void {
   console.log("val",val);
  this.selectedVertreter.next(val);
   let tempjson = JSON.stringify({"vertreter":val.vertreter});
  sessionStorage.setItem('timelinevertreter', tempjson);
  
}

public deletevertreter(){
     sessionStorage.removeItem('timelinevertreter');
}
}
