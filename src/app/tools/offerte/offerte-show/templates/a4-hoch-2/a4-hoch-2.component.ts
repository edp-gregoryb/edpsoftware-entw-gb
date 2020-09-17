import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl, NgModel } from '@angular/forms';
import { Instanztemplatedata } from '../../instanztemplatedata';

@Component({
  selector: 'app-a4-hoch-2',
  templateUrl: './a4-hoch-2.component.html',
  styleUrls: ['./a4-hoch-2.component.css'] //,
  // encapsulation: ViewEncapsulation.None
})
export class A4Hoch2Component implements OnInit {

  constructor() { }

  ngOnInit() {
   
  }

  @Input() verkaufsdokument:  FormGroup;
  @Input() instanz:           string;                   // nur bis alles auf Instanztemplatedata umgestellt
  @Input() templatedata:      Instanztemplatedata;
  
  
  
  // Template-Helperfunktionen
  // =========================
  
  erscheinungsdatenAufbereiten (text: string[], count: number) {
    let list:string = "";
    for (let item of text) {
      if (item != "") {
        if (list === "") {        // Liste ist leer, daher direkt neues Element einfügen und - falls nur ein Element einzufügen ist - Routine beenden
          list += item;
          if (count == 1) break;
        }
        else list += ", " + item; // mindestens ein Element besteht bereits, daher muss ein Komma und ein Space vor dem neuen Element eingefügt werden
      }
    }
    return list;
  }
  getTasks(verkaufsdokument){
    return verkaufsdokument.get('titel').controls;
  }
}
