import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl, NgModel } from '@angular/forms';
import { Instanztemplatedata } from '../../instanztemplatedata';

@Component({
  selector: 'app-a4-hoch-4',
  templateUrl: './a4-hoch-4.component.html',
  styleUrls: ['./a4-hoch-4.component.css'] //,
  // encapsulation: ViewEncapsulation.None
})
export class A4Hoch4Component implements OnInit {

  constructor() { }

  ngOnInit() {
   
  }

  @Input() verkaufsdokument:  FormGroup;
  @Input() instanz:           string;                   // nur bis alles auf Instanztemplatedata umgestellt
  @Input() templatedata:      Instanztemplatedata;
  
  grundpreis:                 number;
  
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
  
  getRabatte(zusatz){
    let ret = [];
    
    for(let k = 0; k < zusatz.length; k++){
      //console.log(zusatz[k].controls.posKey.value + " -> " + zusatz[k].controls.bezeichnung.value);
      if(zusatz[k].controls.preisUser.value || zusatz[k].controls.preisAmasys.value){
        if((zusatz[k].controls.preisUser.value != '0' || zusatz[k].controls.preisAmasys.value != '0') && (zusatz[k].controls.typ.value == '2' || zusatz[k].controls.typ.value == '3' || zusatz[k].controls.typ.value == '4' || zusatz[k].controls.typ.value == '5' || zusatz[k].controls.typ.value == '7')){
          ret.push(zusatz[k].controls);
        }
      }
    }
    return ret;
  }
  
  getGrundpreis(zusatz){
    for(let k = 0; k < zusatz.length; k++){
      if(zusatz[k].controls.preisUser.value){
        if(zusatz[k].controls.preisUser.value != '0' && (zusatz[k].controls.typ.value != '2' && zusatz[k].controls.typ.value != '3' && zusatz[k].controls.typ.value != '4' && zusatz[k].controls.typ.value != '5' && zusatz[k].controls.typ.value != '7')){
          this.grundpreis = zusatz[k].controls
          return true;
        }
      }
    }
    return false;
  }
}
