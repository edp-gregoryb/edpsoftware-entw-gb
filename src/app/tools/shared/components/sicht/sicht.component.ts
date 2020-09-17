import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { FisextgetsichtService } from '../../services/fisextgetsicht.service';
import { RestgetberechtstufenService } from '../../services/restgetberechtstufen.service';

import { words } from '../../../../../locale/words';

@Component({
  selector: 'app-sicht',
  templateUrl: './sicht.component.html',
  styleUrls: ['./sicht.component.css'],
  providers: [FisextgetsichtService, RestgetberechtstufenService]
})
export class SichtComponent implements OnInit {
  
  aktuellesicht:any;
  berecht:any;
  selected:any;
  berechtstufen: Array<BerechtStufen> = [];
  @Output() sichtvalue = new EventEmitter();
  @Input() detailanzeige:any;
  
  //html string linked with locale/words
  sight: string;
  
  iconarray: any = {'Alle':'language', 'Bereich':'account_balance', 'Team':'group', 'Mitarbeiter':'face' };
  
  constructor(private fisextgetsichtService:FisextgetsichtService, private restgetberechtstufenService:RestgetberechtstufenService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.sight = words.sight;
    
    this.fisextgetsichtService.getSicht()
      .subscribe((sicht)=> {
                       console.log("sicht[0].sicht",sicht[0].sicht);
                        this.aktuellesicht = sicht;
                        this.selected = sicht[0].sicht;
                        this.cdr.detectChanges();
                        this.sichtvalue.next(sicht[0].sicht);
                        let tempjson = JSON.stringify({'value':sicht[0].sicht});
                        sessionStorage.setItem('crmsicht',tempjson);
                        
                      },
                      (err) => {
                        console.warn(err);
                      }
                      );
    
    
    this.restgetberechtstufenService.getBerecht()
            .subscribe((ber)=> {
              
                       console.log("berecht",ber);
                        this.berecht = ber;
                      },
                      (err) => {
                        console.warn(err);
                      }
                      );
  }
  
  public selectedvalue(val){
    console.log("sicht",val);
    if (val){
      this.sichtvalue.next(val.value);
     
      let tempjson = JSON.stringify({'value':val.value});
      sessionStorage.setItem('timelinesicht', tempjson);
    }
  }

}
export interface BerechtStufen{
  stufe:string;
  beschreibung:string;
}
