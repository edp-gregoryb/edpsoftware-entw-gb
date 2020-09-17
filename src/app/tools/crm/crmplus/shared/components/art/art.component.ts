import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';


import { Observable } from 'rxjs';
import { RestitaufartabfrageService } from '../../services/restitaufartabfrage.service';

@Component({
  selector: 'app-art',
  templateUrl: './art.component.html',
  styleUrls: ['./art.component.css']
})
export class ArtComponent implements OnInit {

  artvalue:string;
  public filter: FormGroup;
  formctrl = new FormControl();
  arts:any;
  @Output() selectedart = new EventEmitter();
   @Input() sicht: string;
   @Input() aufart:string;
   
  constructor(private restitaufartabfrageService:RestitaufartabfrageService) {
    
    let art = sessionStorage.getItem('timelineart');
    if (art){
        let tempart = JSON.parse(art);
        console.log("art",art);
        this.artvalue = tempart.aufart_bezeichnung;
        this.selectedart.next(tempart.aufart);
    }
    
    }

  ngOnInit() {
  }
  
      public Artchange(event):void {
    console.log("event",event);
     if(event === undefined){console.log("event = undefined");} else {
    if(event !== "undefined" && event.length >= 2){
            this.restitaufartabfrageService.getAufart(this.sicht)
            .subscribe((art)=> {
              
                        this.arts = this.filterByString(art, event);
                        
                      },
                      (err) => {
                        console.warn(err);
                      }
                      );
               } else {
                 console.log("zurücksetzen der variable rubriktvalue");
                this.selectedart.next('');
               }
               };

}

public filterByString(data, filterValue) {
   filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase();
   return data.filter(e => e.aufart_bezeichnung.toLowerCase().includes(filterValue))
       .sort((a,b) => a.aufart_bezeichnung.includes(filterValue) && !b.aufart_bezeichnung.includes(filterValue) ? -1 : b.aufart_bezeichnung.includes(filterValue) && !a.aufart_bezeichnung.includes(filterValue) ? 1 :0);
}

public additemforsearch(val):void {
   console.log("val",val);
this.selectedart.next(val);
let tempjson = JSON.stringify({"aufart":val.aufart, "aufart_bezeichnung": val.aufart_bezeichnung});
sessionStorage.setItem('timelineart', tempjson);
}

public artdelete(){
    sessionStorage.removeItem('timelineart');
}

}
